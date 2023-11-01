import React, { useEffect } from 'react';

const DiscordChatWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
    script.async = true;
    script.defer = true;

    script.innerHTML = `
      new Crate({
        server: '1166056595738869820',
        channel: '1166056595738869823',
      })
      .on('error', (error) => {
        console.error('WidgetBot Error:', error);
      });
    `;

    script.onerror = (error) => {
      console.error('Script loading error:', error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default DiscordChatWidget;
