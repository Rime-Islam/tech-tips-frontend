"use client"

const HtmlContent = ({ content }: { content: string }) => {
    return <div className="text-gray-900 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content }}/>
};

export default HtmlContent