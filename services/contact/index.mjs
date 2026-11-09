import { EmailMessage } from "cloudflare:email";
import { handleContact } from "./handler.mjs";

export default {
  async fetch(request, env) {
    return handleContact(request, env, raw => env.CONTACT_EMAIL.send(
      new EmailMessage("formular@contab-online.ro", env.CONTACT_DESTINATION, raw),
    ));
  },
};
