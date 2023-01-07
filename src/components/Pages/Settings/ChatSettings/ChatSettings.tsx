import React, { useState } from "react";
import { components } from "../Settings";
import FolderSettings from "./FolderSettings";

interface Props {
    updateRoute: (newRoute: string) => void;
    route: string;
}

function ChatSettings(props: Props) {
    const { updateRoute, route } = props;
    const [fontSize, setFontSize] = useState(16);
    const [roundMessage, setRoundMessage] = useState(7);

    const { Container, Card } = components;

    const go = (i: string) => {
        updateRoute(i);
    };

    const settingCardStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "0.8rem 2rem",
        gap: "0.35rem",
    };

    return (
        <Container className="flex col">
            {route.endsWith("Chat") && (
                <>
                    <Card style={settingCardStyle}>
                        <h3>Font Size - {fontSize}px</h3>

                        <input
                            value={fontSize}
                            style={{ width: "100%" }}
                            type="range"
                            min={12}
                            max={22}
                            onChange={(e) =>
                                setFontSize(parseInt(e.target.value))
                            }
                        />
                    </Card>
                    <Card style={settingCardStyle}>
                        <h3>Round Corners of Message - {roundMessage}px</h3>
                        <input
                            value={roundMessage}
                            style={{ width: "100%" }}
                            type="range"
                            max={16}
                            onChange={(e) =>
                                setRoundMessage(parseInt(e.target.value))
                            }
                            min={3}
                        />
                    </Card>
                    <Card style={settingCardStyle}>
                        <h3>Some Settings</h3>
                    </Card>
                    <Card onClick={() => go("Folder")} interactice>
                        <h3>Chat Folders</h3>
                    </Card>
                </>
            )}

            {route.endsWith("Folder") && <FolderSettings />}
        </Container>
    );
}

export default ChatSettings;
