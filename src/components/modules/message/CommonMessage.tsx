/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CircleUser, RefreshCcw, Search, Send } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { seletCurrentToken } from "@/redux/features/auth/authSlice";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import type { FieldValues } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import { format } from "date-fns";
import { useAllUserQuery } from "@/redux/features/users/users.api";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Spinner from "@/components/common/Spinner";

export default function CommonMessage() {
  const authToken: any = useAppSelector(seletCurrentToken);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedList, setSelectedList] = useState<string>("recent");
  console.log(selectedUser);
  const { data, isLoading } = useAllUserQuery([
    { name: "limit", value: 30 },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
  ]);
  const users = data?.data?.data;

  const { data: myData } = useGetMeQuery(undefined);
  const userData = myData?.data;

  const {
    sendMessage,
    messageList,
    chatMessages,
    loading,
    fetchMessagesByUserId,
  } = useWebSocket("wss://api.mentoruuniversity.org/", authToken);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle user selection
  const handleUserSelect = (userId: string, user: any) => {
    setSelectedUserId(userId);
    setSelectedUser(user);
    fetchMessagesByUserId(userId);
  };

  // Handle send message
  const handleSubmit = (data: FieldValues) => {
    if (!selectedUserId || !data.message.trim()) return;

    const messageData: any = {
      event: "message",
      receiverId: selectedUserId,
      message: data.message,
    };

    sendMessage(messageData);

    // Clear the input field after sending
    return { message: "" };
  };

  const handleSearch = (data: FieldValues) => {
    setSearchTerm(data.search);
  };

  // Get current user ID from auth (assuming it's available)
  const currentUserId = userData?.commonId;

  return (
    <div
      className={`flex h-[90vh] bg-secondary ${
        messagesEndRef?.current ? "mt-16" : "mt-0"
      }`}
    >
      {/* Left Sidebar */}
      <div className="w-80 border-r flex flex-col ">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Chats</h1>
          </div>
        </div>

        <div className="flex gap-2 my-3 mx-2">
          <p
            onClick={() => setSelectedList("recent")}
            className={`p-2 rounded-sm cursor-pointer ${
              selectedList === "recent" ? "bg-green-800" : "bg-black/20"
            }`}
          >
            Recent
          </p>
          <p
            onClick={() => setSelectedList("all")}
            className={`p-2 rounded-sm cursor-pointer ${
              selectedList === "all" ? "bg-green-800" : "bg-black/20"
            }`}
          >
            All User
          </p>

          {/* {
            selectedList === "all" &&         <div className="flex gap-7 items-center">
          <div className="flex gap-1 items-center text-primary border-b border-primary text-xl space-x-3 pb-2">
            <h3>ALL</h3>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="bg-transparent px-2 py-1 text-primary"
            >
              <option className="bg-secondary" value="USER">
                USERS
              </option>
              {userOptions?.map((item: any) => (
                <option key={item} className="bg-secondary" value={item}>
                  {item}
                </option>
              ))}
            </select>
            <h3>({users?.length})</h3>
          </div>

        </div>
          } */}
        </div>

        {selectedList === "all" && (
          <div className="flex gap-3">
            <MyFormWrapper onSubmit={handleSearch} className="flex items-start">
              <MyFormInput
                name="search"
                inputClassName="rounded-none p-2"
                placeholder="Search..."
              />

              <button className="p-[9px] border border-white/70">
                <Search />
              </button>
            </MyFormWrapper>

            <div className="inline-block">
              <button
                onClick={() => setSearchTerm("")}
                className="p-[9px] border border-white/70"
              >
                <RefreshCcw />
              </button>
            </div>
          </div>
        )}

        {/* Chat List */}
        {selectedList === "recent" ? (
          <div className="overflow-auto flex-1">
            {loading && !messageList ? (
              <p className="p-4">
                {" "}
                <Spinner />
              </p>
            ) : (
              messageList?.data?.map((chat: any) => (
                <button
                  key={chat?.user?.id}
                  className={`flex items-center gap-3 p-4 hover:bg-[#BFE91F14] cursor-pointer w-full text-left ${
                    selectedUserId === chat?.user?.id ? "bg-[#BFE91F14]" : ""
                  }`}
                  onClick={() => handleUserSelect(chat?.user?.id, chat?.user)}
                >
                  <Avatar>
                    {chat?.user?.profileImage ? (
                      <AvatarImage
                        src={chat?.user?.profileImage}
                        alt={chat?.user?.fullName}
                      />
                    ) : (
                      <CircleUser className="text-3xl w-10 h-10" />
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">
                        {chat?.user?.fullName}
                      </span>
                      {chat?.lastMessage?.createdAt && (
                        <span className="text-xs text-gray-500">
                          {format(
                            new Date(chat?.lastMessage?.createdAt),
                            "HH:mm"
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-start truncate">
                      {chat?.lastMessage?.message}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="overflow-auto flex-1">
            {isLoading ? (
              <p className="p-4">
                {" "}
                <Spinner />
              </p>
            ) : (
              users?.map((chat: any) => (
                <button
                  key={chat?.id}
                  className={`flex items-center gap-3 p-4 hover:bg-[#BFE91F14] cursor-pointer w-full text-left ${
                    selectedUserId === chat?.id ? "bg-[#BFE91F14]" : ""
                  }`}
                  onClick={() => handleUserSelect(chat?.id, chat)}
                >
                  <Avatar>
                    {chat?.profileImage ? (
                      <AvatarImage
                        src={chat?.profileImage}
                        alt={chat?.fullName}
                      />
                    ) : (
                      <CircleUser className="text-3xl w-10 h-10" />
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{chat?.fullName}</span>
                      {chat?.lastMessage?.createdAt && (
                        <span className="text-xs text-gray-500">
                          {format(
                            new Date(chat?.lastMessage?.createdAt),
                            "HH:mm"
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-start truncate">
                      {chat?.lastMessage?.message}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="flex items-center gap-4 p-4 border-b">
              <Avatar>
                {selectedUser?.profileImage ? (
                  <AvatarImage
                    src={selectedUser?.profileImage}
                    alt={selectedUser?.fullName}
                  />
                ) : (
                  <CircleUser className="text-3xl w-10 h-10" />
                )}
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">{selectedUser?.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedUser?.status || "Online"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading messages...</p>
                </div>
              ) : chatMessages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                chatMessages?.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.senderId === currentUserId
                          ? "bg-green-800 text-white"
                          : "bg-[#BFE91F14]"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderId === currentUserId
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >
                        {format(new Date(msg.createdAt), "HH:mm")}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <MyFormWrapper
                onSubmit={handleSubmit}
                className="flex gap-2 w-full"
              >
                <MyFormInput
                  name="message"
                  className="w-full"
                  placeholder="Type a message..."
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-green-800 hover:bg-green-700 p-6"
                  disabled={loading}
                >
                  <Send className="h-6 w-6" />
                </Button>
              </MyFormWrapper>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <CircleUser className="mx-auto h-16 w-16 mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Select a conversation
              </h3>
              <p>Choose a contact from the left to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
