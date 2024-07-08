<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
.container{
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.head-container {
    display: flex;
    justify-content: space-between;
}
.logo-mff {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center
}
.body-container {
    display: grid;
    justify-content: center;
    align-content: center;
}
.detail-visitor {
    display: flex;
    justify-content: space-between;
    align-content: center
}
</style>
<body>
    <div class="container">
        <div class="head-container">
            <div>
                <img style="width: 300px;" src="{{ asset('./images/logo-pemko.png') }}" alt="" srcset="">
            </div>
            <div><img style="width: 300px;" src="{{ asset('./images/logo-kolaborasi.png') }}" alt="" srcset=""></div>
        </div>
        <div class="logo-mff">
            <img style="width: 300px;" src="{{ asset('./images/logo-acara.png') }}" alt="" srcset="">
        </div>
        <div class="body-container">
            <div class="visitor-name">
                <p style="text-align: center;">Nama visitor</p>
                <p style="text-align: center;">Instansi</p>
                <p style="text-align: center;">Mengundang Bapak/ibu</p>
            </div>
            <div class="detail-visitor">
                <div class="detail-visitor__left">
                    <div class="detail-visitor__venue">
                        <p>Venue</p>
                        <p>isi venu</p>
                    </div>
                    <div class="detail-visitor__gate">
                        <p>Gate In</p>
                        <p>isi gate</p>
                    </div>
                </div>
                <div class="detail-visitor__right">
                    <div class="detail-visitor__date">
                        <p style="text-align: right;">Show Date</p>
                        <p style="text-align: right;">isi date</p>
                    </div>
                    <div class="detail-visitor__type">
                        <p style="text-align: right;">Ticket Type</p>
                        <p style="text-align: right;">isi section</p>
                    </div>
                </div>
            </div>
            <div class="warn-ticket">
                <p style="text-align: center;">E-Ticket ini hanya berlaku untuk satu orang. Tunjukkan tiket ini kepada Panitia & jangan membuat salinan tiket ini.
                    Hanya Salinan pertama yang akan diterima. Siapa pun yang menunjukan tiket ini dianggap sebagai pemilik tiket.</p>
            </div>
            <div class="image-ticket">
                Gambar TMPT DUDUK
            </div>
        </div>
    </div>
</body>
</html>
