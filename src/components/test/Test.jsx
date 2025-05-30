import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function DeepSearchComponent() {
    const [logs, setLogs] = useState([]);
    const [finalResponse, setFinalResponse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModels, setSelectedModels] = useState(['VGG', 'ResNet']);
    const [isLoading, setIsLoading] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const eventSourceRef = useRef(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert("Please enter a search query.");
            return;
        }
        setIsLoading(true);
        setLogs([{ type: "info", message: "Initializing search..." }]);
        setFinalResponse(null);
        setTaskId(null);

        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }

        try {
            const response = await axios.post('http://localhost:8000/initiate-search', {
                query: searchQuery,
                models: selectedModels
            });

            if (response.data.task_id) {
                setTaskId(response.data.task_id);
            } else {
                throw new Error("Failed to get a valid task ID from the server.");
            }
        } catch (error) {
            console.error("Search initiation error:", error);
            const errorMessage = error.response?.data?.detail || error.message || "Unknown error during initiation.";
            setLogs(prev => [...prev, { type: "error", message: `Search initiation failed: ${errorMessage}` }]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!taskId) return;

        setLogs(prev => [...prev, { type: "info", message: `Connecting to event stream for task: ${taskId}` }]);
        const es = new EventSource(`http://localhost:8000/search-events/${taskId}`);
        eventSourceRef.current = es;

        es.onopen = () => {
            setLogs(prev => [...prev, { type: "info", message: "Log stream connection established." }]);
        };

        es.onmessage = (event) => {
            try {
                const eventData = JSON.parse(event.data);

                if (eventData.type === 'FINAL_RESPONSE') {
                    setFinalResponse(eventData.data);
                    setLogs(prev => [...prev, { type: "highlight", step: "DONE", message: "Search complete. Final response received." }]);
                    setIsLoading(false);
                    es.close();
                } else if (['log', 'info', 'error', 'highlight'].includes(eventData.type)) {
                    setLogs(prev => [...prev, eventData]);
                } else if (eventData.type === 'STREAM_END') {
                    setLogs(prev => [...prev, { type: "info", message: "Log stream ended by server." }]);
                    if (!finalResponse) setIsLoading(false);
                    es.close();
                }
            } catch (e) {
                console.error("Failed to parse event data:", event.data, e);
                setLogs(prev => [...prev, { type: "error", message: "Received malformed event from server." }]);
            }
        };

        es.onerror = (error) => {
            console.error('EventSource failed:', error);
            setLogs(prev => [...prev, { type: "error", message: 'Log stream connection error or closed unexpectedly.' }]);
            setIsLoading(false);
            es.close();
        };

        return () => {
            if (es) es.close();
            eventSourceRef.current = null;
        };
    }, [taskId]);

    const availableModels = ['VGG', 'ResNet', 'ViT', 'CLIP'];
    const toggleModel = (model) => {
        setSelectedModels(prev =>
            prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
        );
    };

    return (
        <div>
            <h2>Deep Search</h2>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter search query (e.g., 'cat on a roof')"
                    disabled={isLoading}
                    style={{ marginRight: '10px', minWidth: '200px' }}
                />
            </div>
            <div style={{ margin: '10px 0' }}>
                <strong>Select Models:</strong>
                {availableModels.map(model => (
                    <label key={model} style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={selectedModels.includes(model)}
                            onChange={() => toggleModel(model)}
                            disabled={isLoading}
                        /> {model}
                    </label>
                ))}
            </div>
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Start Deep Search'}
            </button>

            <div style={{ marginTop: '20px' }}>
                <h3>Live Logs:</h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                    {logs.map((log, index) => (
                        <li key={index} style={{
                            color: log.type === 'error' ? 'red' : log.type === 'highlight' ? 'blue' : 'inherit',
                            marginBottom: '5px',
                            fontFamily: 'monospace',
                            fontSize: '0.9em'
                        }}>
                            {new Date().toLocaleTimeString()} - {log.step ? `[${log.step}] ` : ''}{log.message}
                            {log.details && <pre style={{ fontSize: '0.8em', marginLeft: '20px', whiteSpace: 'pre-wrap' }}>{JSON.stringify(log.details, null, 2)}</pre>}
                        </li>
                    ))}
                </ul>
            </div>

            {finalResponse && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Final Response:</h3>
                    <pre style={{ border: '1px solid #007bff', padding: '10px', backgroundColor: '#f0f8ff', whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(finalResponse, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default DeepSearchComponent;
