import React from "react";
import "./HoneyComb.css";
import image from "../../Assets/hackarena_1_0_yellow_3.jpg"
import useWindowWidth from "../../Hooks/useWindowWidth";

const HexagonGrid = () => {
    const windowWidth = useWindowWidth();

    const rows = new Array(3).fill(0); // Adjust for the number of hexagons you need
    const columns = new Array(5).fill(0); // Adjust for the number of hexagons you need
    const hexagonSize = 1 / columns.length * windowWidth;

    const getTranslation = (index: number) => {
        const xOffset = index % 2 ? 0 : hexagonSize / 2; // Adjust this to match your hexagon width
        const yOffset = -hexagonSize * 0.25 * index;

        return `translate(${xOffset}px, ${yOffset}px)`; // Translation (percentage based)
    }

    const getBgTranslation = (row: number, column: number) => {
        const xOffset = -column * (hexagonSize + 5) + (row % 2 ? hexagonSize / 2 : 0);
        const yOffset = -row * (hexagonSize - hexagonSize * 0.25);


        return `${xOffset}px ${yOffset}px`; // Translation (percentage based)
    }

    return (
        <div className="hexagon-grid">
            {rows.map((_, row) => (
                <div className="hexagon-row">
                    {
                        columns.map((_, column) => (
                            <div key={column} className={`hexagon hex-${column}`} style={{ width: `${hexagonSize}px`, height: `${hexagonSize}px`, transform: getTranslation(row) }}>
                                <div
                                    className="hex-image"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundPosition: getBgTranslation(row, column),
                                    }}
                                ></div>
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    );
};

// Helper function to calculate background position based on the hexagon index
const getBackgroundPosition = (index: number) => {
    const row = Math.floor(index / 4); // Assuming 4 hexagons per row
    const col = index % 4;
    const xOffset = col * 25; // Adjust this to match your hexagon width
    const yOffset = row * 30; // Adjust this for proper vertical placement

    return `${xOffset}% ${yOffset}%`; // Background position (percentage based)
};

export default HexagonGrid;
