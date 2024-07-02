import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ExpandableText = ({ content, loading }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    
    if (loading) return null

    if (!content || content.length === 0) {
        return <p>No content to display</p>;
    }
    
    if (content.length === 1) {
        const { sectionTitle, sectionContent } = content[0];
        return (
            <div>
                <h2 className='font-semibold underline mb-1'>Section 1:</h2>
                <div class="ml-2">
                    <p className='font-semibold'>{sectionTitle}</p>
                    <p>{sectionContent}</p>
                </div>
            </div>
        );
    }


    return (
        <div className='text-sm'>
            
                <div className='ml-2'>
                    <p>{isExpanded ? content.map((item, index) => (
                        <div key={index} className='my-2'>
                            <h2 className='mb-1 font-semibold underline'>Section {index + 1}:</h2>
                            <div class="ml-2">
                                <p className='font-semibold'>{item.sectionTitle}</p>
                                <p>{item.sectionContent}</p>
                            </div>
                        </div>
                    )) : 
                    <>
                        <h2 className='mb-1 font-semibold underline'>Section 1:</h2>
                        <div class="ml-2">
                            <p className='font-semibold'>{content[0].sectionTitle}</p>
                            <p>{content[0].sectionContent}</p>
                        </div>
                    </>}
                    </p>
                    
                </div>
            <Button variant="outline" onClick={toggleExpand} className="mt-2">
                {isExpanded ? 
                <>
                Read Less
                <ChevronUp size={12} /> 
                </> 
                : 
                <>
                Read More
                <ChevronDown size={12} /> 
                </>
                }
            </Button>
        </div>
    );
};

export default ExpandableText;
