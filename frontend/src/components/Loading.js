import React from "react";

const Loading = () => {
    return (
        <div className="loading">
            <div className="bg-overlay"></div>
            <div className="sk-flow">
                <div className="sk-flow-dot"></div>
                <div className="sk-flow-dot"></div>
                <div className="sk-flow-dot"></div>
            </div>
        </div>
    )
}

export default Loading