<!DOCTYPE html>
<html>
<head>
    <title>Invitation</title>
    <style>
        /* Tambahkan gaya CSS Anda di sini */
        body {
            font-family: Arial, sans-serif;
        }
        .container {
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
            align-content: center;
        }
        .body-container {
            display: grid;
            justify-content: center;
            align-content: center;
        }
        .detail-visitor {
            display: flex;
            justify-content: space-between;
            align-content: center;
        }
    </style>
</head>
<body>
    <div class="container">
        {{-- <img style="width: 300px;" src="data:image/png;base64,{{ $logoPemko }}" alt="" srcset="">
<img style="width: 300px;" src="data:image/png;base64,{{ $logoKolaborasi }}" alt="" srcset="">
<img style="width: 300px;" src="data:image/png;base64,{{ $logoAcara }}" alt="" srcset="">
<img src="data:image/png;base64,{{ $barcode }}" alt=""> --}}
        {{-- <div class="head-container">
            <div>
                <img style="width: 300px;" src="{{ $logoPemkoPath }}" alt="Logo Pemko">
            </div>
            <div>
                <img style="width: 300px;" src="{{ $logoKolaborasiPath }}" alt="Logo Kolaborasi">
            </div>
        </div>
        <div class="logo-mff">
            <img style="width: 300px;" src="{{ $logoAcaraPath }}" alt="Logo Acara">
        </div> --}}
        <div class="body-container">
            <div class="visitor-name">
                <p style="text-align: center;">{{ $visitor->name }}</p>
                <p style="text-align: center;">{{ $visitor->instansi }}</p>
                <p style="text-align: center;">Mengundang Bapak/ibu</p>
            </div>
            <div class="detail-visitor">
                <div class="detail-visitor__left">
                    <div class="detail-visitor__venue">
                        <p>Venue</p>
                        <p>{{ $visitor->venue }}</p>
                    </div>
                    <div class="detail-visitor__gate">
                        <p>Gate In</p>
                        <p>{{ $visitor->gate }}</p>
                    </div>
                </div>
                <div class="detail-visitor__right">
                    <div class="detail-visitor__date">
                        <p style="text-align: right;">Show Date</p>
                        <p style="text-align: right;">{{ $visitor->tanggal}}</p>
                    </div>
                    <div class="detail-visitor__type">
                        <p style="text-align: right;">Ticket Type</p>
                        <p style="text-align: right;">{{ $visitor->ticket_type }}</p>
                    </div>
                </div>
            </div>
            <div>
                {{-- <img src="{{ $barcodePath }}" alt="Barcode"> --}}
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
