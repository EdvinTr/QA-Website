<template>
  <mdb-container class="card-animation">
    <mdb-navbar dark class="inbox-navbar">
      <mdb-navbar-nav>
        <mdb-nav-item @click="handleInbox">Inbox</mdb-nav-item>
        <mdb-nav-item @click="handleMessages">Send Message</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar>
    <mdb-card>
      <mdb-card-body>
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
        <h2
          v-if="messages.length == 0 && !messageSent"
          class="no-messages-text"
        >
          You have no messages :(
        </h2>
        <mdb-card v-if="messageSent">
          <mdb-card-body>
            <h2 class="message-sent-text fade">
              {{ messageSentText }}
            </h2>
          </mdb-card-body>
        </mdb-card>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>
<script>
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import MessageService from "../../services/MessageService";
import UserService from "../../services/UserService";
import {
  mdbContainer,
  mdbNavbar,
  mdbNavbarNav,
  mdbNavItem,
  mdbCard,
  mdbCardBody,
} from "mdbvue";
export default {
  name: "TabPage",
  components: {
    mdbContainer,
    mdbNavbar,
    mdbNavbarNav,
    mdbNavItem,
    mdbCard,
    mdbCardBody,

    Messages,
    SendMessage,
  },
  data() {
    return {
      inboxVisible: true,
      sendMessageVisible: false,
      messages: [],
      senders: [],
      messageSent: false,
      messageSentText: "Your message has been sent!",
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
      this.messageSent = true;
      setTimeout(() => {
        this.messageSent = false;
      }, 3000);
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
.no-messages-text {
  margin-top: 2rem;
  text-align: center;
}
.message-sent-text {
  text-align: center;
  color: #00b74a;
  opacity: 1;
  animation: fade 3s linear;
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>