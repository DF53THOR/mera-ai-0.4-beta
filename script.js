// Basit veritabanı - PC bileşenleri hakkında sorular ve cevaplar
const knowledgeBase = [
    {
        question: "işlemci nedir",
        answer: "İşlemci (CPU), bir bilgisayarın beyni olarak kabul edilir. Tüm hesaplamaları yapar ve diğer bileşenleri yönetir. Örneğin Intel Core i7 veya AMD Ryzen 7 gibi modeller popülerdir."
    },
    {
        question: "ekran kartı ne işe yarar",
        answer: "Ekran kartı (GPU), bilgisayarın görüntüleri monitöre aktarmasından sorumludur. Özellikle oyun ve grafik tasarımı için önemlidir. NVIDIA ve AMD başlıca ekran kartı üreticileridir."
    },
    {
        question: "ram nedir",
        answer: "RAM (Random Access Memory), bilgisayarın geçici veri depoladığı bellektir. Daha fazla RAM, daha hızlı çoklu görev yapabilme imkanı sağlar. 8GB günümüz için minimum, 16GB orta seviye, 32GB ve üzeri ise profesyonel kullanım için idealdir."
    }
];

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Hoşgeldin animasyonunu göster
    const welcomeAnimation = document.getElementById('welcome-animation');
    const container = document.querySelector('.container');
    
    // 3 saniye sonra hoşgeldin animasyonunu kapat ve ana içeriği göster
    setTimeout(() => {
        welcomeAnimation.style.display = 'none';
        container.style.display = 'block';
        
        // Ana içerik gösterildikten sonra ilk mesajı ekle
        setTimeout(() => {
            addMessageToChat("Merhaba! Hoşgeldiniz. Ben Mera Beta 0.1, PC bileşenleri hakkında sorularınızı yanıtlayabilen bir yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?", 'ai');
        }, 300);
    }, 3000);
    
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const allQuestionsBtn = document.getElementById('all-questions-btn');
    const modal = document.getElementById('questions-modal');
    const closeBtn = document.querySelector('.close');
    const questionsList = document.getElementById('questions-list');
    
    // Tüm sorular modalını açma/kapama
    allQuestionsBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        populateQuestionsList();
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Soru listesini doldur
    function populateQuestionsList() {
        questionsList.innerHTML = '';
        knowledgeBase.forEach(item => {
            const questionItem = document.createElement('div');
            questionItem.classList.add('question-item');
            questionItem.textContent = item.question;
            questionItem.addEventListener('click', function() {
                userInput.value = item.question;
                modal.style.display = 'none';
                handleUserMessage();
            });
            questionsList.appendChild(questionItem);
        });
    }
    
    // Gönder butonuna tıklama olayı
    sendBtn.addEventListener('click', handleUserMessage);
    
    // Enter tuşuna basma olayı
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
    
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Gönder butonunda yükleme animasyonunu göster
        const btnText = sendBtn.querySelector('.btn-text');
        const btnLoading = sendBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        
        // Kullanıcı mesajını sohbet kutusuna ekle
        addMessageToChat(message, 'user');
        
        // Yapay zeka yanıtını al
        const response = getAIResponse(message);
        
        // Yanıtı gecikmeli olarak sohbet kutusuna ekle (doğal hissettirmek için)
        setTimeout(() => {
            addMessageToChat(response, 'ai');
            
            // Yükleme animasyonunu kapat
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            
            // Sohbet kutusunu en aşağı kaydır
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1500);
        
        // Giriş alanını temizle
        userInput.value = '';
    }
    
    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        
        const messageHeader = document.createElement('div');
        messageHeader.classList.add('message-header');
        messageHeader.textContent = sender === 'user' ? 'Siz' : 'Mera Beta 0.1';
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        messageElement.appendChild(messageHeader);
        messageElement.appendChild(messageText);
        chatBox.appendChild(messageElement);
        
        // Sohbet kutusunu en aşağı kaydır
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function getAIResponse(userMessage) {
        // Gelen mesajı küçük harfe çevir ve soru işaretlerini kaldır
        const normalizedMessage = userMessage.toLowerCase().replace('?', '').trim();
        
        // Bilgi tabanında eşleşen bir soru var mı kontrol et
        for (const item of knowledgeBase) {
            if (normalizedMessage.includes(item.question)) {
                return item.answer;
            }
        }
        
        // Bazı basit selamlama durumları
        if (normalizedMessage.includes('merhaba') || normalizedMessage.includes('selam') || normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
            return "Merhaba! Size PC bileşenleri hakkında nasıl yardımcı olabilirim? Hangi bileşenler hakkında bilgi almak istersiniz?";
        }
        
        if (normalizedMessage.includes('teşekkür') || normalizedMessage.includes('sağ ol') || normalizedMessage.includes('thanks')) {
            return "Rica ederim! Başka bir konuda daha yardımcı olabilirim. Sorularınızı bekliyorum!";
        }
        
        if (normalizedMessage.includes('günaydın')) {
            return "Günaydın! PC bileşenleri hakkında size nasıl yardımcı olabilirim?";
        }
        
        if (normalizedMessage.includes('iyi geceler')) {
            return "İyi geceler! Yarın görüşmek üzere, sorularınızı bekliyorum.";
        }
        
        // Eğer eşleşme bulunamazsa
        return "Üzgünüm, bu sorunuzu anlayamadım. Lütfen başka bir şekilde sorun veya başka bir PC bileşeni konusu hakkında soru sorun. 'Tüm Sorular' butonuna tıklayarak sorabileceğiniz soruları görebilirsiniz.";
    }
});