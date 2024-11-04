"use strict";

function reloadLocation() {
   window.location.reload();
}

// create element\
const CE = (tagName, className = [], inrHtml = "", parent = null) => {
   const e = document.createElement(tagName);
   if (className) e.classList.add(...className);
   if (inrHtml) e.innerHTML = inrHtml;
   if (parent) parent.appendChild(e);
   return e;
};

function setDataToLocalStorage(key, object) {
   localStorage.setItem(key, JSON.stringify(object));
}

function getDataToLocalStorage(key) {
   const data = localStorage.getItem(key);
   return data ? JSON.parse(data) : null;
}

function OBJECTtoJSON(data) {
   return JSON.stringify(data);
}
function JSONtoOBJECT(data) {
   return JSON.parse(data);
}

function getFormatTime(t) {
   const date = new Date(0);
   date.setSeconds(t);
   return date.toISOString().substr(11, 8);
}

function runtimeSendMessage(type, message, callback) {
   if (typeof message === "function") {
      chrome.runtime.sendMessage({ type }, (response) => {
         message && message(response);
      });
   } else {
      chrome.runtime.sendMessage({ ...message, type }, (response) => {
         callback && callback(response);
      });
   }
}

function tabSendMessage(tabId, type, message, callback) {
   // if third parameter is not pass. in message parameter pass callback function
   if (typeof message === "function") {
      chrome.tabs.sendMessage(tabId, { type }, (response) => {
         message && message(response);
      });
   } else {
      chrome.tabs.sendMessage(tabId, { ...message, type }, (response) => {
         callback && callback(response);
      });
   }
}

function runtimeOnMessage(type, callback) {
   chrome.runtime.onMessage.addListener((message, sender, response) => {
      if (type === message.type) {
         callback(message, sender, response);
      }
      return true;
   });
}

const debounce = (func, delayFn) => {
   let debounceTimer;
   return function (...args) {
      const context = this;
      const delay = delayFn();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
   };
};

function setInputLikeHuman(element) {
   const event = new Event("change", { bubbles: true });
   element.dispatchEvent(event);
}

function inputKeyboardEnterClick(input) {
   const enterEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      keyCode: 13,
      code: "Enter",
      which: 13,
      bubbles: true,
   });
   input.dispatchEvent(enterEvent);
}


async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
   const enc = new TextEncoder();
   const passwordData = enc.encode(password);
   const saltedPassword = new Uint8Array([...salt, ...passwordData]);

   const hashBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);
   const hashArray = Array.from(new Uint8Array(hashBuffer));
   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
   const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
   
   return { salt: saltHex, hash: hashHex };
}

async function verifyPassword(inputPassword, pass) {
   const [hashedPassword, saltHex] = pass.split(" ");
   const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
   const { hash } = await hashPassword(inputPassword, salt);
   return hash === hashedPassword;
}

function date() {
   const date = new Date();
   const yy = date.getFullYear();
   const mm = date.getMonth() + 1;
   const dd = date.getDate();
   const hh = date.getHours();
   const ss = date.getMinutes();
   const ms = date.getSeconds();
   return { yy, mm, dd, hh, ss, ms };
}

// ----- ----- ----- example ----- ----- -----
// (async () => {
//    const { hash, salt } = await hashPassword("password");
//    console.log(hash, salt);
   
//    const is = await verifyPassword("Password", hash, salt);
//    console.log(is);
// })();

function N(numberString) {
   return parseInt(numberString);
}


function injectScript(src) {
   const script = document.createElement("script");
   script.src = chrome.runtime.getURL(src);
   script.onload = () => script.remove();
   (document.head || document.documentElement).appendChild(script);
}

function injectJSCode(code) {
   // Create a new `<script>` element
   const scriptElement = document.createElement('script');
   // Set the `type` attribute to `text/javascript`
   scriptElement.setAttribute('type', 'text/javascript');
   // Set the `textContent` property for the inline JavaScript code
   scriptElement.textContent = code;
   // Append the `<script>` element to the document's `documentElement` element (before </html>)
   document.documentElement.appendChild(scriptElement);
}

// Function to inject external JavaScript file
function injectJSLink(src) {
   // Create a new `<script>` element
   const scriptElement = document.createElement('script');
   // Set the `type` attribute to `text/javascript`
   scriptElement.setAttribute('type', 'text/javascript');
   // Set the `src` attribute for the URL of the external JavaScript file
   scriptElement.setAttribute('src', src);
   // Append the `<script>` element to the document's `documentElement` element (before </html>)
   document.documentElement.appendChild(scriptElement);
}