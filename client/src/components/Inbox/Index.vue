<template>
  <mdb-container>
    <mdb-navbar dark class="inbox-navbar">
      <mdb-navbar-nav>
        <mdb-nav-item @click="handleInbox">Inbox</mdb-nav-item>
        <mdb-nav-item @click="handleMessages">Send Message</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar>
    <SendMessage
      v-on:messageSent="handleMessageSent"
      v-if="sendMessageVisible"
    />
    <Messages
      v-on:deleteMessage="deleteMessage"
      v-if="inboxVisible"
      :messages="messages"
      :senders="senders"
    />
  </mdb-container>
</template>
<script>
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import MessageService from "../../services/MessageService";
import UserService from "../../services/UserService";
import { mdbContainer, mdbNavbar, mdbNavbarNav, mdbNavItem } from "mdbvue";
export default {
  name: "TabPage",
  components: {
    mdbContainer,
    mdbNavbar,
    mdbNavbarNav,
    mdbNavItem,

    Messages,
    SendMessage,
  },
  data() {
    return {
      inboxVisible: true,
      sendMessageVisible: false,
      messages: [],
      senders: [],
    };
  },
  async mounted() {
    try {
      const payload = {
        userId: this.$store.state.user.id,
        username: this.$store.state.user.username,
        email: this.$store.state.user.email,
      };
      const { data } = await MessageService.getMessages(payload);
      this.messages = data;
      try {
        let sendersToFind = [];

        for (let i = 0; i < this.messages.length; i++) {
          if (!sendersToFind.includes(this.messages[i].senderId)) {
            const { data } = await UserService.findUserById(
              this.messages[i].senderId
            );
            this.senders = [...this.senders, data];
            sendersToFind = [...sendersToFind, this.messages[i].senderId];
          }
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    handleInbox() {
      this.sendMessageVisible = false;
      this.inboxVisible = true;
    },
    handleMessages() {
      this.inboxVisible = false;
      this.sendMessageVisible = true;
    },
    handleMessageSent() {
      this.sendMessageVisible = false;
      this.inboxVisible = true;
    },
    deleteMessage(id) {
      this.messages = this.messages.filter((message) => message.id != id);
    },
  },
};
</script>
<style scoped>
.inbox-navbar {
  margin-top: 1rem;
  background-color: #1d1f20;
}
</style>