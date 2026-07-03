// ============================================
// SylNet Application Logic
// ============================================
console.log("SylNet Prototype Loaded");

document.addEventListener('DOMContentLoaded', function () {

    // নিচের নেভিগেশনে বর্তমান পেজ হাইলাইট করা
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.bottom-nav a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // মজলিস চিপ (ফিল্টার) টগল করা
    document.querySelectorAll('.chip-rail').forEach(function (rail) {
        const chips = rail.querySelectorAll('.chip');
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                chips.forEach(function (c) { c.classList.remove('active'); });
                chip.classList.add('active');
            });
        });
    });

    // মজলিসে যোগ দেওয়া / ছাড়ার বাটন টগল
    document.querySelectorAll('.join-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const joined = btn.classList.toggle('joined');
            btn.textContent = joined ? '✅ যোগ দিছি' : 'যোগ দাও';
        });
    });

    // ---------- রিয়েকশন পিকার ----------
    // ইভেন্ট ডেলিগেশন ব্যবহার করা হয়েছে, যাতে নতুন যোগ হওয়া পোস্টেও (localStorage থেকে) কাজ করে

    function closeAllPickers(exceptWrap) {
        document.querySelectorAll('.reaction-picker.show').forEach(function (p) {
            if (!exceptWrap || !exceptWrap.contains(p)) {
                p.classList.remove('show');
            }
        });
    }

    document.addEventListener('click', function (e) {

        const btn = e.target.closest('.reaction-btn');
        const item = e.target.closest('.r-item');

        // ১) মূল বাটনে ক্লিক করলে পিকার খোলা/বন্ধ করা
        if (btn) {
            const wrap = btn.closest('.reaction-wrap');
            const picker = wrap.querySelector('.reaction-picker');
            const isOpen = picker.classList.contains('show');
            closeAllPickers(wrap);
            if (isOpen) {
                picker.classList.remove('show');
            } else {
                picker.classList.add('show');
            }
            return;
        }

        // ২) পিকার থেকে কোনো রিয়েকশন বেছে নিলে
        if (item) {
            const wrap = item.closest('.reaction-wrap');
            const targetBtn = wrap.querySelector('.reaction-btn');
            const emoji = item.getAttribute('data-emoji');
            const label = item.getAttribute('data-label');

            targetBtn.querySelector('.r-emoji').textContent = emoji;
            targetBtn.querySelector('.r-label').textContent = label;
            targetBtn.setAttribute('data-emoji', emoji);
            targetBtn.classList.add('reacted');

            closeAllPickers();
            return;
        }

        // ৩) বাইরে ক্লিক করলে সব পিকার বন্ধ হয়ে যাবে
        closeAllPickers();
    });

});
