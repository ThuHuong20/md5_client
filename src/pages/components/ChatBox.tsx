import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardFooter,
    MDBIcon,
    MDBBtn
} from "mdb-react-ui-kit";
import './chatbox.scss'
import { Socket, io } from "socket.io-client";
import moment from 'moment';
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";

interface Data {
    open: boolean
}
export default function App(data: Data) {
    const userStore = useSelector((store: StoreType) => store.userStore);
    const [socketClient, setSocketClient] = useState<Socket | null>(null);
    const [messageData, setMessageData] = useState<any[]>([]);
    const [inputContent, setInputContent] = useState("");

    useEffect(() => {
        if (data.open) {
            setSocketClient(
                io(`http://127.0.0.1:3000`, {
                    query: {
                        token: localStorage.getItem("token"),
                    },
                })
            );
        } else {
            socketClient?.disconnect();
            setSocketClient(null);
        }
    }, [data.open]);

    useEffect(() => {
        if (socketClient) {
            socketClient.on('connectStatus', (data: any) => {
                //alert(data)
            });

            socketClient.on('historyMessage', (data: any) => {
                setMessageData(data);
                console.log("messageData", messageData);
            });
        }
    }, [socketClient, messageData]);

    function formatData(data: any) {
        let result = [];
        for (let i in data) {
            if (result.length === 0) {
                result.push({
                    ...data[i],
                    contents: [{
                        content: data[i].content,
                        time: data[i].time,
                    }],
                });
            } else {
                if (data[i].type === result[result.length - 1].type) {
                    if (Array.isArray(result[result.length - 1].contents)) {
                        result[result.length - 1].contents.unshift({
                            content: data[i].content,
                            time: data[i].time,
                        });
                    } else {
                        result[result.length - 1].contents = [{
                            content: result[result.length - 1].content,
                            time: result[result.length - 1].time,
                        }, {
                            content: data[i].content,
                            time: data[i].time,
                        }];
                    }
                } else {
                    result.push({
                        ...data[i],
                        contents: [{
                            content: data[i].content,
                            time: data[i].time,
                        }],
                    });
                }
            }
        }
        return result;
    }

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "transparent" }}>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol>
                    <MDBCard id="chat2" style={{ borderRadius: "15px", border: "1px solid grey" }}>
                        <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                            <h5 className="mb-0">Chat With Lancome Store</h5>
                        </MDBCardHeader>
                        <div style={{ position: "relative", height: "400px", overflowY: "auto" }}>
                            <MDBCardBody>
                                {formatData(messageData).map(message => (
                                    <div key={Math.random() * Date.now()} className={message.type === "ADMIN" ? "d-flex flex-row justify-content-start" : "d-flex flex-row justify-content-end"}>
                                        <div className="content">
                                            {message.contents.map((item: any) => (
                                                <p key={Math.random() * Date.now()} className={message.type === "ADMIN" ? "small p-2 ms-3 mb-1 rounded-3" : "small p-2 me-3 mb-1 text-white rounded-3 bg-primary"} style={{ backgroundColor: "#f5f6f7" }}>
                                                    {item.content}
                                                </p>
                                            ))}
                                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                                                {moment(new Date(Number(message.time))).format('LT')}
                                            </p>
                                        </div>
                                        {message.type !== "ADMIN" && (
                                            <img
                                                src="https://media.istockphoto.com/id/1276619054/vector/admin-support-service-icon.jpg?s=1024x1024&w=is&k=20&c=OPT9JSDZ0-H-Abzn9Oqfvx0jod8HMkKRM-o20OlOXPI="
                                                alt="avatar 1"
                                                style={{ width: "45px", height: "100%" }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </MDBCardBody>
                        </div>
                        <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                            <img
                                src={userStore && (userStore as any).avatar}
                                alt="avatar 3"
                                style={{ width: "45px", height: "100%" }}
                            />
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="exampleFormControlInput1"
                                placeholder="Type message"
                                value={inputContent}
                                onChange={(e) => setInputContent(e.target.value)}
                            ></input>
                            <a className="ms-1 text-muted" href="#!">
                                <MDBIcon fas icon="paperclip" />
                            </a>
                            <a className="ms-3 text-muted" href="#!">
                                <MDBIcon fas icon="smile" />
                            </a>
                            <span onClick={() => {
                                if (inputContent && socketClient) {
                                    socketClient.emit('onMessage', {
                                        socketId: socketClient.id,
                                        userId: (userStore as any).id,
                                        content: inputContent,
                                    });
                                } else {
                                    console.log("Input content is empty or socket client is not available.");
                                }
                            }} className="ms-3">
                                <MDBIcon fas icon="paper-plane" />
                            </span>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}