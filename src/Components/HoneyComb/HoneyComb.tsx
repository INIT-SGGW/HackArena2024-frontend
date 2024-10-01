import React, { useEffect, useRef } from "react";
import "./HoneyComb.css";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import getEventStatus, { EventStatus } from "../../Utils/getEventStatus";

interface ComponentText {
    title: string;
    description: {
        first: string;
        second: string;
    };
    buttons: {
        events: string;
        aboutUs: string;
        register: string;
    };
}

interface Props {
    image: string;
    defaultHexagonSize: number;
    gap: number;
    componentText: ComponentText;
}

function getImageAspectRatio(imageSrc: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        // Set up the 'load' event listener to get dimensions after the image is loaded
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            if (height === 0) {
                reject("Image height is zero, can't calculate aspect ratio");
            } else {
                const aspectRatio = height / width;
                resolve(aspectRatio);
            }
        };

        // Error handling in case the image cannot be loaded
        img.onerror = () => {
            reject("Failed to load image");
        };

        // Set the image source to start loading
        img.src = imageSrc;
    });
}



const HexagonGrid = ({ image, defaultHexagonSize, gap, componentText }: Props) => {
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    // state
    const [imageAspectRatio, setImageAspectRatio] = React.useState<number>(0);
    const [hexagonGridWidth, setHexagonGridWidth] = React.useState<number>(0);
    const [hexagonGridHeight, setHexagonGridHeight] = React.useState<number>(0);
    const [hexagonSize, setHexagonSize] = React.useState<number>(0);
    const [columnNumber, setColumnNumber] = React.useState<number>(0);
    const [rowNumber, setRowNumber] = React.useState<number>(0);
    const [idealHexagonSize, setIdealHexagonSize] = React.useState<number>(1);
    const [blackHexagonesRow, setBlackHexagonesRow] = React.useState<number>(0);
    const [blackHexagonesColumn, setBlackHexagonesColumn] = React.useState<number>(0);

    // refs
    const hexagonGridRef = useRef<HTMLDivElement>(null);
    const hexagonHeaderWrapperRef = useRef<HTMLDivElement>(null);
    const hexagonHeaderRef = useRef<HTMLDivElement>(null);

    // image aspect ratio setup
    useEffect(() => {
        getImageAspectRatio(image).then((aspectRatio) => {
            setImageAspectRatio(aspectRatio);
        });
    }, [image]);

    useEffect(() => {
        const idealHexagonSize =
            windowWidth < 480 ? Math.floor(defaultHexagonSize * 0.6) : windowWidth < 1000 ?
                Math.floor(defaultHexagonSize * 0.75) :
                defaultHexagonSize;
        setIdealHexagonSize(idealHexagonSize);
    }, [windowWidth, defaultHexagonSize]);

    // grid setup
    useEffect(() => {
        // get hexagon grid width - grid container width minus padding
        if (hexagonGridRef.current) {
            const computedStyle = window.getComputedStyle(hexagonGridRef.current);
            const hexagonGridWidth: number = computedStyle.width ? parseInt(computedStyle.width) : 0;
            const hexagonGridHeight: number = computedStyle.height ? parseInt(computedStyle.height) : 0;
            const hexagonGridPadding: number = computedStyle.paddingLeft ? parseInt(computedStyle.paddingLeft) : 0;
            const hexagonGridWidthNoPadding: number = hexagonGridWidth - hexagonGridPadding * 2;
            if (hexagonGridWidthNoPadding <= windowWidth) {
                // on first render, hexagonGrid width is not wide enough to fill the screen
                setHexagonGridWidth(windowWidth + 50);
            } else {
                setHexagonGridWidth(hexagonGridWidthNoPadding);
            }
            setHexagonGridHeight(hexagonGridHeight);
        }
    }, [windowWidth, hexagonGridRef.current]);

    useEffect(() => {
        setColumnNumber(Math.floor(hexagonGridWidth / idealHexagonSize));
    }, [hexagonGridWidth, idealHexagonSize]);


    useEffect(() => {
        let hexagonSize = 1 / columnNumber * (hexagonGridWidth); // size of hexagons based on the number of columns
        setHexagonSize(hexagonSize);
    }, [columnNumber, hexagonGridWidth]);

    useEffect(() => {
        const minComponentHeight = 550;
        const maxComponentHeight = minComponentHeight + 50;
        const rowHeight = hexagonSize * 0.75 + gap;
        let numberOfRows = Math.floor(imageAspectRatio * hexagonGridWidth / rowHeight) + 1; // calculate number of rows based on the image aspect ratio
        if (numberOfRows * rowHeight > maxComponentHeight) {
            numberOfRows = Math.floor(maxComponentHeight / rowHeight);
        } else if (numberOfRows * rowHeight < minComponentHeight) {
            numberOfRows = Math.floor(minComponentHeight / rowHeight);
        }

        // const result = numberOfRows * (hexagonSize + gap) > maxComponentHeight ? Math.floor(maxComponentHeight / (hexagonSize * 0.75 + gap)) : numberOfRows;
        setRowNumber(!Number.isNaN(numberOfRows) ? numberOfRows : 5);
    }, [imageAspectRatio, hexagonGridWidth, hexagonSize]);


    // hexagon grid height setup
    useEffect(() => {
        if (hexagonGridRef.current) {
            const height = (hexagonSize * 0.75 + gap) * rowNumber - hexagonSize * 0.25 - gap;
            hexagonGridRef.current.style.height = `${height}px`;
            setHexagonGridHeight(height);
        }
    }, [hexagonSize, rowNumber]);

    useEffect(() => {
        if (hexagonHeaderRef.current) {

            const hexagonRows = document.querySelectorAll('.hexagon-row');
            let count = 0;
            hexagonRows.forEach(row => {
                // Check if the row contains a div with the class hexagon-black
                if (row.querySelector('.hexagon-black')) {
                    count += 1;
                }
            });
            setBlackHexagonesRow(count);
        }
    }, [windowWidth, hexagonHeaderRef.current]);

    useEffect(() => {
        if (hexagonHeaderRef.current) {
            const headerHeight = hexagonHeaderRef.current.offsetHeight;
            let verticalHexagones = Math.floor((headerHeight + hexagonSize * 1.5) / (hexagonSize * 0.75 + gap));
            if (windowWidth < 840 && (rowNumber - verticalHexagones % 2 === 0)) {
                verticalHexagones += 1;
            }
            setBlackHexagonesRow(verticalHexagones);

            let horizontalHexagones = Math.floor(columnNumber / 2) - 2;
            if (windowWidth < 840) {
                horizontalHexagones = columnNumber - 1;
            } else if (windowWidth < 1430) {
                horizontalHexagones += 1;
            }

            setBlackHexagonesColumn(horizontalHexagones);
        }
    }, [windowWidth, hexagonHeaderRef.current, columnNumber, rowNumber]);

    // hexagon header setup
    useEffect(() => {
        if (hexagonHeaderRef.current) {
            if (hexagonHeaderWrapperRef.current) {
                const hexagonHeaderWrapperHeight = blackHexagonesRow * (hexagonSize * 0.75 + gap) - hexagonSize * 0.25;
                let actualColumncount = blackHexagonesColumn - (blackHexagonesRow % 2 === 0 ? 0.5 : 0) - Math.floor((blackHexagonesRow - 1) / 2);
                if (windowWidth < 840) {
                    actualColumncount = blackHexagonesColumn - 1;
                }
                const hexagonHeaderWrapperWidth = actualColumncount * hexagonSize
                hexagonHeaderWrapperRef.current.style.height = hexagonHeaderWrapperHeight + "px";
                hexagonHeaderWrapperRef.current.style.width = hexagonHeaderWrapperWidth + "px";
            }
        }
    }, [hexagonSize, hexagonHeaderWrapperRef.current, blackHexagonesColumn, blackHexagonesRow]);

    function isContentSection(row: number, column: number): boolean {
        if (windowWidth < 840) {
            return false;
        }
        const halfIndex = Math.floor(columnNumber / 2) + 1; // gets the halfway index + 1
        let exactIndex = halfIndex - (Math.floor((row + 1) / 2)); // since rows are translated relative to each other by 50%, we need to adjust the index
        if (windowWidth < 1430) {
            exactIndex += 1;
        }
        return column < exactIndex;
    }

    const isBlackHexagon = (row: number, column: number) => {
        if (windowWidth < 840) {
            const limit = Math.floor((rowNumber - blackHexagonesRow) / 2);
            if (row > limit - 1 && row < rowNumber - limit && column > - row % 2 && column <= blackHexagonesColumn - row % 2 - (row % 2 === 0 ? 1 : 0)) {
                return true;
            }
        } else if (row > 0 && row <= blackHexagonesRow && column > 0 && column <= (blackHexagonesColumn - Math.floor(row / 2) + (row % 2 === 0 ? 1 : 0))) {
            return true;
        }
        return false;
    }

    const getTop = (index: number) => {
        return (hexagonSize * 0.75 + gap) * index - hexagonSize * 0.25;
    }

    const getLeft = (index: number) => {
        return index % 2 === 0 ? 0 : hexagonSize / 2;
    }

    const getBgTranslation = (row: number, column: number) => {
        // const xOffset = -column * hexagonSize + 0 + (row % 2 === 0 ? 0 : -hexagonSize / 2);
        const xOffset = -(columnNumber - column - 1) * hexagonSize + 0 + (row % 2 === 0 ? 0 : hexagonSize / 2);
        const yOffset = -(rowNumber / 2 - row) * (hexagonSize * 0.75 + gap) + hexagonSize * 0.5;

        return `calc(100% - ${xOffset}px) calc(50% - ${yOffset}px)`; // Translation (percentage based)
    }

    const indexRange = (indexRow: number, indexColumn: number, maxColumn: number, maxRow: number) => {
        var range: number[][] = [];

        Array(3).fill(0).forEach((_, i) => {
            Array(3).fill(0).forEach((_, j) => {
                const row = indexRow + i - 1;
                const column = indexColumn + j - 1;
                if (indexRow % 2 === 0 && column === indexColumn + 1 && row !== indexRow) {
                    return;
                }
                else if (indexRow % 2 === 1 && column === indexColumn - 1 && row !== indexRow) {
                    return;
                } else {
                    range.push([row, column]);
                }

            })
        })
        const resut = range.filter((r) => r[0] >= 0 && r[0] < maxRow && r[1] >= 0 && r[1] < maxColumn);

        return resut;
    }

    const handleHexagonHover = (row: number, column: number) => {
        if (windowWidth < 512) {
            return;
        }
        const rows = document && document.querySelectorAll('.hexagon-row');
        const indexRanges = indexRange(row, column, columnNumber, rows.length);
        removeHoverClass();

        indexRanges.forEach((index: number[]) => {
            const hexagon = rows && rows[index[0]].children[index[1]] as HTMLElement;
            hexagon.classList.add('hexagon-hovered');
            if (index[0] === row && index[1] === column) {
                hexagon.classList.add('hexagon-hovered-center');
            }
        })
    }

    const removeHoverClass = () => {
        const hexagons = document && document.querySelectorAll('.hexagon');
        hexagons && hexagons.forEach((h) => {
            h.classList.remove('hexagon-hovered');
            h.classList.remove('hexagon-hovered-center');
        });
    }

    return (
        <div ref={hexagonGridRef} className="hexagon-grid" style={{ width: `calc(100% + ${hexagonSize}px)` }} >
            <div
                ref={hexagonHeaderWrapperRef}
                className="hexagon__header-wrapper"
                style={{
                    top: windowWidth < 840 ? "50%" : `${hexagonSize * 0.75}px`,
                    left: windowWidth < 840 ? `${hexagonSize}px` : `${hexagonSize * 1.5}px`
                }}
            >
                <div
                    ref={hexagonHeaderRef}
                    className="hexagon__header">
                    <h1>{componentText.title}</h1>
                    <p>{componentText.description.first}</p>
                    <span>{componentText.description.second}</span>
                    <div>
                        {
                            getEventStatus() === EventStatus.RegistrationOpen ?
                                <>
                                    <Button onClick={() => navigate("/rejestracja")} className="btn btn__primary" border>{componentText.buttons.register}</Button>
                                    <Button onClick={() => navigate("/wydarzenia")} className="btn btn__secondary">{componentText.buttons.events}</Button>
                                </> :
                                <>
                                    <Button onClick={() => navigate("/wydarzenia")} className="btn btn__primary" border>{componentText.buttons.events}</Button>
                                    <Button onClick={() => window.location.href = "#o_nas"} className="btn btn__secondary">{componentText.buttons.aboutUs}</Button>
                                </>
                        }
                    </div>
                </div>
            </div>
            {new Array(rowNumber).fill(0).map((_, row) => (
                <div key={row} className="hexagon-row" style={{ top: `${getTop(row)}px`, left: `${getLeft(row)}px`, gap: gap + "px" }}>
                    {
                        new Array(columnNumber).fill(0).map((_, column) => {
                            return (
                                <div key={column} className={`hexagon ${isContentSection(row, column) ? 'hidden' : ''} ${isBlackHexagon(row, column) ? "hexagon-black" : ""}`}
                                    onMouseEnter={() => handleHexagonHover(row, column)}
                                    onMouseLeave={removeHoverClass}
                                    style={{
                                        width: `${hexagonSize}px`,
                                        height: `${hexagonSize}px`,
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: hexagonGridWidth * imageAspectRatio <= hexagonGridHeight ? `auto ${hexagonGridHeight + hexagonSize}px` : `${hexagonGridWidth}px auto`,
                                        backgroundPosition: getBgTranslation(row, column),
                                    }}
                                />

                            )
                        })
                    }
                </div>
            ))
            }
        </div >
    );
};

export default HexagonGrid;
