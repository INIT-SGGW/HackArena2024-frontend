import React, { useEffect } from 'react'
import './Page.css'

interface PageProps {
    children: React.ReactNode;
    pageTitle: string;
    description: string;
    paddingTop?: boolean;
    noIndex?: boolean;
}

// Comonent for setting meta tags for the page
function Page({ children, pageTitle, description, paddingTop = true, noIndex = false }: PageProps) {
    const [topBarHeight, setTopbarHeight] = React.useState<number>(0);

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
        <div className={`page-container${paddingTop ? ' page-container--padding-top' : ""}`}>
            {children}
        </div>
    )
}

export default Page