import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const ExpandableText = ({ text, maxLength = 485 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    if (text.length <= maxLength) {
        return <p>{text}</p>;
    }

    return (
        <div>
            <p>
                {isExpanded ? text : `${text.substring(0, maxLength)}...`}
            </p>
            <Button onClick={toggleExpand} className="mt-2">
                {isExpanded ? 'Read Less' : 'Read More'}
            </Button>
        </div>
    );
};

export default ExpandableText;
