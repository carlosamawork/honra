import { ContentModuleWithColor } from "@/types/shared/Shared";
import { PortableTextComponents } from "@portabletext/react";

interface PortableBlockComponentsProps {
    data?: ContentModuleWithColor;
}

export const portableBlockComponents = ({
    data,
}: PortableBlockComponentsProps): PortableTextComponents => {
    return {
        block: {
            normal: ({ children }) => (
                <p
                    className={`text-16 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
            h1: ({ children }) => (
                <p
                    className={`text-60 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
            h2: ({ children }) => (
                <p
                    className={`text-45 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
            h3: ({ children }) => (
                <p
                    className={`text-30 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
            h4: ({ children }) => (
                <p
                    className={`text-20 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
            h5: ({ children }) => (
                <p
                    className={`text-16 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
            h6: ({ children }) => (
                <p
                    className={`text-14 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </p>
            ),
        },
        marks: {
            strong: ({ children }) => (
                <strong className={`text-${data?.secondaryColor || "green"}`}>
                    {children}
                </strong>
            ),
        },
        list: {
            bullet: ({ children }) => (
                <ul style={{ marginLeft: "calc(var(--margin) / 2)" }}>
                    {children}
                </ul>
            ),
            number: ({ children }) => (
                <ol style={{ marginLeft: "calc(var(--margin) / 2)" }}>
                    {children}
                </ol>
            ),
        },
        listItem: {
            bullet: ({ children }) => (
                <li
                    style={{ listStyle: "disc" }}
                    className={`text-25 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </li>
            ),
            number: ({ children }) => (
                <li
                    style={{ listStyle: "decimal" }}
                    className={`text-25 text-${
                        data?.typographyColor || "black"
                    }`}
                >
                    {children}
                </li>
            ),
        },
    };
};
