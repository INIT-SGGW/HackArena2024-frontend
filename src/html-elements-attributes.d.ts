import * as React from 'react';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        'skeleton-width'?: string; // Add your custom attribute here
    }
}

declare module 'react' {
    // Extend ButtonHTMLAttributes to include custom attributes
    interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
        'button-text'?: string; // Custom attribute for button elements
    }
}