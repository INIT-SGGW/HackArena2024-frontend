import React, { useEffect } from 'react'

interface PageProps {
    children: React.ReactNode;
    pageTitle: string;
    description: string;
    noIndex?: boolean;
}

// Comonent for setting meta tags for the page
function Page({ children, pageTitle, description, noIndex = false }: PageProps) {
    console.log(pageTitle);

    useEffect(() => {
        {/* Setting page title */ }
        document.title = pageTitle;

        {/* Setting meta description */ }
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            // check if the description is already set
            metaDescription.setAttribute('content', description);
        } else {
            // create new meta description
            const metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = description;
            document.head.appendChild(metaDescription);
        }

        {/* Setting noindex meta tag */ }
        const metaRobots = document.querySelector('meta[name="robots"][content="noindex"]');
        if (metaRobots) {
            // check if the noindex is already set
            if (noIndex) {
                metaRobots.setAttribute('content', 'noindex');
            } else {
                metaRobots.remove();
            }
        } else {
            // create new meta noindex
            if (noIndex) {
                const metaRobots = document.createElement('meta');
                metaRobots.name = 'robots';
                metaRobots.content = 'noindex';
                document.head.appendChild(metaRobots);
            }
        }
    }, [description, noIndex, pageTitle])


    return (
        <>
            {children}
        </>
    )
}

export default Page