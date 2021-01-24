<template>
  <mdb-container>
    <div v-if="messages.length > 0">
      <div v-for="message in messages" :key="message.id">
        <mdb-card class="card-animation mt-2">
          <mdb-card-body>
            <mdb-card-title
              >{{ message.subject }}
              <DeleteMessage
                :message="message"
                v-on:deletedMessage="deleteMessage"
              />
            </mdb-card-title>
            <mdb-card-text>{{ message.textContent }}</mdb-card-text>
            <mdb-card-footer class="text-muted mt-4">
              {{ mapSenderToMessage() }}
            </mdb-card-footer>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>
  </mdb-container>
</template>
<script>
import {
  mdbCard,
  mdbCardBody,
  mdbContainer,
  mdbCardTitle,
  mdbCardFooter,
  mdbCardText,
} from "mdbvue";
import DeleteMessage from "./DeleteMessage";
export default {
  name: "SendMessage",
  props: ["messages", "senders"],
  components: {
    mdbCard,
    mdbCardBody,
    mdbContainer,
    mdbCardTitle,
    mdbCardFooter,
    mdbCardText,

    DeleteMessage,
  },
  data() {
    return {
      sender: null,
    };
  },
  methods: {
    mapSenderToMessage() {
      for (let i = 0; i < this.messages.length; i++) {
        for (let j = 0; j < this.senders.length; j++) {
          if (this.messages[i].senderId == this.senders[j].id) {
            return this.senders[j].username;
          }
        }
      }
    },
    deleteMessage(id) {
      this.$emit("deleteMessage", id);
    },
  },
};
</script>
<style scoped>
</style>