import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mapzest/Sidebar";
import { TopBar } from "@/components/mapzest/TopBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "MapZest — Realtime Chat" },
      { name: "description", content: "Kênh chat trực tiếp và tư vấn khách hàng realtime." },
    ],
  }),
  component: ChatPage,
});

type Message = {
  sender: "user" | "agent";
  text: string;
  time: string;
};

type Chat = {
  id: string;
  user: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: boolean;
  online: boolean;
  messages: Message[];
};

const initialChats: Chat[] = [
  {
    id: "C01",
    user: "Nguyễn Văn Hùng",
    avatar: "H",
    lastMsg: "Dạ vâng, thứ 7 này tầm 3h chiều anh dẫn em qua xem nhà được không?",
    time: "10 phút trước",
    unread: true,
    online: true,
    messages: [
      { sender: "user", text: "Chào anh, em quan tâm căn Biệt thự ven sông Thảo Điền bên anh.", time: "14:30" },
      { sender: "agent", text: "Chào Dũng, biệt thự này hiện đang trống, sẵn sàng xem nhà bất cứ lúc nào. Em có nhu cầu xem vào thời gian nào?", time: "14:32" },
      { sender: "user", text: "Dạ vâng, thứ 7 này tầm 3h chiều anh dẫn em qua xem nhà được không?", time: "14:35" },
    ],
  },
  {
    id: "C02",
    user: "Phạm Minh Thư",
    avatar: "T",
    lastMsg: "Căn hộ Vinhomes Central Park còn thương lượng giá không anh?",
    time: "1 giờ trước",
    unread: false,
    online: false,
    messages: [
      { sender: "user", text: "Căn hộ Vinhomes Central Park còn thương lượng giá không anh?", time: "13:10" },
    ],
  },
  {
    id: "C03",
    user: "Lê Quốc Bảo",
    avatar: "B",
    lastMsg: "Ok anh, gửi em sổ hồng với sơ đồ vị trí qua zalo số này nhé.",
    time: "4 giờ trước",
    unread: false,
    online: true,
    messages: [
      { sender: "agent", text: "Chào anh Bảo, em đã chuẩn bị xong hồ sơ pháp lý nhà phố Quận 1 rồi.", time: "09:00" },
      { sender: "user", text: "Ok anh, gửi em sổ hồng với sơ đồ vị trí qua zalo số này nhé.", time: "09:15" },
    ],
  },
];

function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string>("C01");
  const [newMsgText, setNewMsgText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    setChats(prev =>
      prev.map(c =>
        c.id === activeChatId
          ? {
              ...c,
              lastMsg: newMsgText,
              unread: false,
              messages: [
                ...c.messages,
                { sender: "agent", text: newMsgText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
              ],
            }
          : c
      )
    );
    setNewMsgText("");
    toast.success("Đã gửi tin nhắn!");
  };

  const filteredChats = chats.filter(c =>
    c.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-canvas text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto flex flex-col">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Realtime Chat</h1>
            <p className="text-sm text-muted-foreground">
              Hệ thống tin nhắn trực tiếp giữa khách hàng, môi giới và quản trị viên.
            </p>
          </div>

          {/* Chat Container */}
          <div className="flex-1 min-h-[500px] grid grid-cols-12 gap-6 bg-card rounded-xl border border-border overflow-hidden animate-in fade-in duration-200">
            {/* Chat list */}
            <div className="col-span-12 md:col-span-4 border-r border-border flex flex-col h-full bg-secondary/10">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Cuộc hội thoại
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm hội thoại..."
                    className="pl-9 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {filteredChats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition cursor-pointer ${
                      activeChatId === chat.id ? "bg-card border-l-4 border-primary" : "hover:bg-secondary/40"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-info to-primary flex items-center justify-center text-white text-sm font-semibold">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${chat.unread ? "text-foreground font-bold" : "text-muted-foreground"}`}>{chat.user}</span>
                        <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className={`text-xs truncate mt-1 ${chat.unread ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                        {chat.lastMsg}
                      </p>
                    </div>
                    {chat.unread && (
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat View */}
            <div className="col-span-12 md:col-span-8 flex flex-col h-full bg-card">
              {activeChat ? (
                <>
                  {/* Header chat */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-info to-primary flex items-center justify-center text-white text-sm font-semibold">
                        {activeChat.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{activeChat.user}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          {activeChat.online ? (
                            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success inline-block" /> Đang trực tuyến</span>
                          ) : (
                            <span>Ngoại tuyến</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages Body */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-secondary/5">
                    <div className="text-center py-2">
                      <Badge variant="outline" className="text-[10px] text-muted-foreground bg-secondary border-transparent">
                        Kết nối bảo mật bởi AI Assistant
                      </Badge>
                    </div>
                    {activeChat.messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.sender === "agent" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] rounded-xl p-3 text-xs ${
                          m.sender === "agent"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-secondary text-foreground rounded-tl-none"
                        }`}>
                          <p>{m.text}</p>
                          <div className={`text-[9px] mt-1 text-right ${m.sender === "agent" ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                            {m.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSendChat} className="p-4 border-t border-border flex gap-2">
                    <Input
                      placeholder="Nhập nội dung tin nhắn tư vấn..."
                      value={newMsgText}
                      onChange={(e) => setNewMsgText(e.target.value)}
                      className="flex-1 text-xs"
                    />
                    <Button type="submit" size="icon" className="cursor-pointer shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 text-secondary mb-2" />
                  Chọn một cuộc trò chuyện để bắt đầu tư vấn.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
