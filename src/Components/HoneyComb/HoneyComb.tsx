import React, { useEffect, useRef } from "react";
import "./HoneyComb.css";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import image from "../../Assets/hackarena_1_0_yellow_4.jpg";

interface ComponentText {
    title: string;
    description: {
        first: string;
        second: string;
    };
    buttons: {
        events: string;
        aboutUs: string;
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
    const [idealHexagonSize, setIdealHexagonSize] = React.useState<number>(windowWidth < 768 ? Math.floor(defaultHexagonSize * 0.75) : defaultHexagonSize);

    // refs
    const hexagonGridRef = useRef<HTMLDivElement>(null);
    const hexagonHeaderWrapperRef = useRef<HTMLDivElement>(null);
    const hexagonHeaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const idealHexagonSize =
            windowWidth < 768 ?
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
            setHexagonGridWidth(hexagonGridWidthNoPadding);
            setHexagonGridHeight(hexagonGridHeight);
        }
    }, [windowWidth, hexagonSize]);

    useEffect(() => {
        setColumnNumber(Math.floor(hexagonGridWidth / idealHexagonSize));
        let hexagonSize = 1 / columnNumber * hexagonGridWidth; // size of hexagons based on the number of columns

        if (hexagonGridRef.current) {
            const computedStyle = window.getComputedStyle(hexagonGridRef.current);
            if (parseInt(computedStyle.height) < window.innerHeight * 0.7) {
                setHexagonSize(hexagonSize);
            }
        }
        const maxComponentHeight = 1920 * imageAspectRatio;
        const minComponentHeight = 500;
        let numberOfRows = Math.floor(imageAspectRatio * hexagonGridWidth / (hexagonSize + gap)) + 1; // calculate number of rows based on the image aspect ratio
        if (numberOfRows * (hexagonSize + gap) > maxComponentHeight) {
            numberOfRows = Math.floor(maxComponentHeight / (hexagonSize * 0.9 + gap));
            console.log("maxComponentHeight", maxComponentHeight);
        } else if (numberOfRows * (hexagonSize + gap) < minComponentHeight) {
            console.log("minComponentHeight", minComponentHeight);
            numberOfRows = Math.ceil(minComponentHeight / (hexagonSize * 1.25 + gap));
        }

        // const result = numberOfRows * (hexagonSize + gap) > maxComponentHeight ? Math.floor(maxComponentHeight / (hexagonSize * 0.75 + gap)) : numberOfRows;
        setRowNumber(!Number.isNaN(numberOfRows) ? numberOfRows : 5);
        console.log(numberOfRows)
    }, [imageAspectRatio, hexagonGridWidth]);



    // hexagon grid height setup
    useEffect(() => {
        if (hexagonGridRef.current) {
            const height = new String((hexagonSize * 0.75 + gap) * rowNumber - hexagonSize * 0.25 - gap);
            hexagonGridRef.current.style.height = height + "px";
        }
    }, [hexagonGridWidth, rowNumber]);

    // image aspect ratio setup
    useEffect(() => {
        getImageAspectRatio(image).then((aspectRatio) => {
            setImageAspectRatio(aspectRatio);
        });
    }, [image]);

    // hexagon header setup
    useEffect(() => {
        if (hexagonHeaderRef.current) {
            const verticalHexagones = new Array(rowNumber).fill(0).reduce((acc, _, i) => acc + isBlackHexagon(i, 1), 0);
            // const headerHeight = hexagonHeaderRef.current.offsetHeight;
            // const verticalHexagones = Math.floor((headerHeight + hexagonSize * 1.5) / (hexagonSize * 0.75 + gap)) + 1;
            const horizontalHexagones = new Array(columnNumber).fill(0).reduce((acc, _, i) => acc + isBlackHexagon(verticalHexagones, i), 0);
            const hexagonHeaderWrapperHeight = verticalHexagones * (hexagonSize * 0.75 - gap);
            const hexagonHeaderWrapperWidth = (horizontalHexagones - (verticalHexagones % 2 === 0 ? 0.5 : 0)) * hexagonSize;
            if (hexagonHeaderWrapperRef.current) {
                hexagonHeaderWrapperRef.current.style.height = hexagonHeaderWrapperHeight + "px";
                hexagonHeaderWrapperRef.current.style.width = hexagonHeaderWrapperWidth + "px";
            }
        }
    }, [hexagonHeaderRef.current, hexagonSize, hexagonHeaderWrapperRef.current, rowNumber, columnNumber]);

    function isContentSection(row: number, column: number): boolean {
        const halfIndex = Math.floor(columnNumber / 2) + 1; // gets the halfway index + 1
        const exactIndex = halfIndex - (Math.floor((row + 1) / 2)); // since rows are translated relative to each other by 50%, we need to adjust the index
        return column < exactIndex;
    }

    const isBlackHexagon = (row: number, column: number) => {
        const halfIndex = Math.floor(columnNumber / 2); // content section half index is Math.floor(columnNumber / 2) + 1
        const exactIndex = halfIndex - (Math.floor((row + 1) / 2)); // since rows are translated relative to each other by 50%, we need to adjust the index
        const headerHeight = hexagonHeaderRef.current ? hexagonHeaderRef.current.offsetHeight : 0;
        const lastRow = Math.floor((headerHeight + hexagonSize * 1.5) / (hexagonSize * 0.75 + gap)) + 1;

        if (row < 1 || row > lastRow || column < 1 || column >= exactIndex) {
            return false;
        }
        return true;
    }

    const getTop = (index: number) => {
        return (hexagonSize * 0.75 + gap) * index - hexagonSize * 0.25;
    }

    const getLeft = (index: number) => {
        return index % 2 === 0 ? 0 : hexagonSize / 2;
    }

    const getBgTranslation = (row: number, column: number) => {
        // const xOffset = -column * hexagonSize + 0 + (row % 2 === 0 ? 0 : -hexagonSize / 2);
        const xOffset = -(columnNumber - column) * hexagonSize + 0 + (row % 2 === 0 ? 0 : hexagonSize / 2);
        const yOffset = -(rowNumber / 2 - row) * (hexagonSize * 0.75);


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
                    width: `${hexagonSize * 5}px`,
                    top: `${hexagonSize * 0.75}px`,
                    left: `${hexagonSize * 1.5}px`
                }}
            >
                <div
                    ref={hexagonHeaderRef}
                    className="hexagon__header">
                    <h1>{componentText.title}</h1>
                    <p>{componentText.description.first}</p>
                    <span>{componentText.description.second}</span>
                    <div >
                        <Button onClick={() => navigate("/wydarzenia")} className="btn btn__primary" border>{componentText.buttons.events}</Button>
                        <Button onClick={() => window.location.href = "#o_nas"} className="btn btn__secondary">{componentText.buttons.aboutUs}</Button>
                    </div>
                </div>
            </div>
            {new Array(rowNumber).fill(0).map((_, row) => (
                <div className="hexagon-row" style={{ top: `${getTop(row)}px`, left: `${getLeft(row)}px`, gap: gap + "px" }}>
                    {
                        new Array(columnNumber).fill(0).map((_, column) => (
                            <div key={column} className={`hexagon ${isContentSection(row, column) ? 'hidden' : ''} ${isBlackHexagon(row, column) ? "hexagon-black" : ""}`}
                                onMouseEnter={() => handleHexagonHover(row, column)}
                                onMouseLeave={removeHoverClass}
                                style={{
                                    width: `${hexagonSize}px`,
                                    height: `${hexagonSize}px`,
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: hexagonGridWidth * imageAspectRatio < hexagonGridHeight ? `auto ${hexagonGridHeight + hexagonSize}px` : `${hexagonGridWidth}px auto`,
                                    backgroundPosition: getBgTranslation(row, column),
                                }}
                            />

                        ))
                    }
                </div>
            ))
            }
        </div >
    );
};

export default HexagonGrid;
