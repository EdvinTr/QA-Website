<template>
  <mdb-card>
    <mdb-card-body>
      <mdb-input
        label="Username"
        type="text"
        outline
        inputClass="z-depth-1 p-3"
        placeholder="Send To:"
        v-model="receiverUsername"
      />
      <mdb-input
        label="Subject"
        type="text"
        outline
        inputClass="z-depth-1 p-3"
        placeholder="Enter a subject..."
        v-model="subject"
      />
      <mdb-input
        label="Message"
        type="textarea"
        outline
        :rows="textAreaRows"
        inputClass="z-depth-1 p-3"
        placeholder="Your message"
        v-model="message"
      />
      <SuccessButton buttonText="Send" :btnClickHandler="this.postMessage" />
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import SuccessButton from "../SuccessButton";
import UserService from "../../services/UserService";
import { mdbCard, mdbCardBody, mdbInput } from "mdbvue";
import MessageService from "../../services/MessageService";
export default {
  name: "SendMessage",
  components: {
    mdbCard,
    mdbCardBody,
    mdbInput,
    SuccessButton,
  },
  data() {
    return {
      receiverUsername: "",
      subject: "",
      message: "",
      textAreaRows: 10,
    };
  },
  methods: {
    async postMessage() {
      try {
        const user = {
          username: this.receiverUsername,
        };
        const { data } = await UserService.findUserByUsername(user);
        if (data.id) {
          const message = {
            senderId: this.$store.state.user.id,
            receiverId: data.id,
            subject: this.subject,
            textContent: this.message,
          };
          try {
            await MessageService.postMessage(message);
            this.$emit("messageSent");
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>