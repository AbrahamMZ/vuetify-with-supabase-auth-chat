/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { ref } from "vue";
import useSupabase from "@/composables/UseSupabase";
import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();

export default function useMessages() {
  const { supabase } = useSupabase();

  const getMessages = async (from, to) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .range(from, to)
      .order("timestamp", { ascending: false });

    console.log(data);
    return data;
  };
  
  const onNewMessage = (handler) => {
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          console.log("Change received!", payload);
          handler(payload.new);
        }
      )
      .subscribe();
  };
  const createNewMessage = async (username, text) => {
    const { data } = await supabase.from("messages").insert({ username, text });

    return data;
  };

  //   user.user_metadata.name
  const username = user.value;
  const messages = ref([]);
  const messagesCount = ref(0);
  const maxMessagesPerRequest = 50;
  const loadMessagesBatch = async () => {
    const loadedMessages = await getMessages(
      messagesCount.value,
      maxMessagesPerRequest - 1
    );
    console.log(loadedMessages);

    messages.value = [...loadedMessages, ...messages.value];
    messagesCount.value += loadedMessages.length;
  };

  loadMessagesBatch();
  onNewMessage((newMessage) => {
    console.log(newMessage);
    messages.value = [newMessage, ...messages.value];
    messagesCount.value += 1;
  });

  return {
    username,
    messages,
    async send(text) {
      if (text) {
        await createNewMessage(username.email, text);
      }
    },
    loadOlder() {
      return loadMessagesBatch();
    },
  };
}
