/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

type WebSocketEvent =
  | "authenticate"
  | "message"
  | "fetchChats"
  | "unReadMessages"
  | "messageList"
  | "onlineUsers";

interface WebSocketMessage {
  event: WebSocketEvent;
  [key: string]: any;
}

interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

const useWebSocket = (url: string, authToken: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messageList, setMessageList] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);

      ws.send(
        JSON.stringify({
          event: "authenticate",
          token: authToken,
        })
      );
      console.log("🔑 Authentication event sent");

      ws.send(JSON.stringify({ event: "messageList" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WS EVENT:", data.event, data);

      switch (data.event) {
        case "messageList":
          setMessageList(data);
          setLoading(false);
          break;

        case "fetchChats":
          setChatMessages(data.data.chats || []);
          setLoading(false);
          break;

        case "message":
          setChatMessages((prev) => [...prev, data.data]);

          if (messageList && messageList.data) {
            const updatedList = messageList.data.map((chat: any) => {
              if (
                chat.user.id === data.data.senderId ||
                chat.user.id === data.data.receiverId
              ) {
                return {
                  ...chat,
                  lastMessage: {
                    message: data.data.message,
                  },
                };
              }
              return chat;
            });
            setMessageList({ ...messageList, data: updatedList });
          }
          break;

        case "messageAdmin": {
          setChatMessages((prev) => [...prev, data.data]);

          if (messageList && messageList.data) {
            const updatedList = messageList.data.map((chat: any) => {
              if (
                chat.user.id === data.data.senderId ||
                chat.user.id === data.data.receiverId
              ) {
                return {
                  ...chat,
                  lastMessage: {
                    message: data.data.message,
                    createdAt: data.data.createdAt,
                  },
                };
              }
              return chat;
            });
            setMessageList({ ...messageList, data: updatedList });
          }

          break;
        }
        default:
      }
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url, authToken]);

  // Function to send messages
  const sendMessage = (data: WebSocketMessage) => {
    console.log(data);
    if (socket && isConnected) {
      socket.send(JSON.stringify(data));
      // console.log("📤 Message sent:", data);
    } else {
      console.warn("⚠️ WebSocket not connected.");
    }
  };

  // Function to fetch messages for a specific user
  const fetchMessagesByUserId = (userId: string) => {
    if (socket && isConnected) {
      const messagesData: any = {
        event: "fetchChats",
        receiverId: userId,
      };
      sendMessage(messagesData);
      setLoading(true);
    }
  };

  return {
    socket,
    messageList,
    chatMessages,
    loading,
    sendMessage,
    fetchMessagesByUserId,
  };
};

export default useWebSocket;
