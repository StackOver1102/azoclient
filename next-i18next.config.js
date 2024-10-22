// next-i18next.config.js
const path = require('path');

const i18n = {
    locales: ['en', 'fr', 'es'],       // Các ngôn ngữ hỗ trợ
    defaultLocale: 'en',               // Ngôn ngữ mặc định
    localeDetection: true,             // Phát hiện ngôn ngữ tự động dựa trên cài đặt trình duyệt
    localePath: path.resolve('./public/locales'), // Đường dẫn đến các tệp bản dịch
};

module.exports = { i18n };
