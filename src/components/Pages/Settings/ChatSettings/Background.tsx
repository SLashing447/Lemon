import React from "react";
import { MdUpload } from "react-icons/md";
import { components } from "../Settings";

function Background() {
    const { Container, Card } = components;

    return (
        <Container>
            <Card style={{ gap: "1rem" }} interactice>
                <span className="icon">
                    <MdUpload />
                </span>

                <h4>Upload Wallpaper</h4>
            </Card>
        </Container>
    );
}

export default Background;
