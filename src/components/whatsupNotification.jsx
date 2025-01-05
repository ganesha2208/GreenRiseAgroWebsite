import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import '../components/css/whatsupNotification.css';

const WhatsupNotification = () => {
  return (
    <FloatingWhatsApp 
      phoneNumber="7218451646"
      accountName="Green Rise Agro Industries"
      allowEsc
      allowClickAway
      notification
      notificationSound
      statusMessage="Typically replies within 15 Minutes"
      chatMessage="Hello! 👋 How can we help you?"
      avatar="https://5.imimg.com/data5/SELLER/Logo/2024/8/443140100/TQ/ZN/MX/56203123/green-raise-120x120.png"
    />
  );
};

export default WhatsupNotification;
