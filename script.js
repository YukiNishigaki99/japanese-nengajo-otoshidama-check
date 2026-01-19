let enteredNumbers = [];

function check() {
    const num = document.getElementById("number").value;
    const result = document.getElementById("result");
    const count = document.getElementById("count");
    const history = document.getElementById("history");

    const win1 = ["455756"];
    const win2 = ["5037"];
    const win3 = ["73", "44", "84"];
    // const specialWin = ["71632", "56540", "20161"];

    if (!/^\d{6}$/.test(num)) {
        result.textContent = "";
        count.textContent = "6桁の数字を入力してください";
        return;
    }

    const last2 = num.slice(-2);
    const last4 = num.slice(-4);
    const last5 = num.slice(-5);

    // 当選結果を判定
    let messages = [];
    let classes = []; // 色用

    if (win1.includes(num)) { messages.push('１等'); classes.push('first'); }
    if (win2.includes(last4)) { messages.push('２等'); classes.push('second'); }
    if (specialWin.includes(last5)) { messages.push('特別賞'); classes.push('special'); }
    if (win3.includes(last2)) { messages.push('３等'); classes.push('third'); }

    // 結果表示
    if (messages.length > 0) {
        // 複数当選に対応
        let spans = messages.map((msg, i) => `<span class="${classes[i]}">${msg}</span>`);
        result.innerHTML = "🎉 " + spans.join(" , ") + " 当選！ 🎉";
    } else {
        result.innerHTML = `<span class="miss">残念…はずれです</span>`;
    }

    // count.textContent = `当選数：${messages.length}`;

    // 入力履歴に追加（重複チェック）
    if (!enteredNumbers.some(item => item.number === num)) {
        enteredNumbers.push({ number: num, result: messages.join(",") || 'はずれ', classes: classes });
    }

    // 履歴リスト表示
    let historyHTML = "<ul><li class='history'>入力履歴</li> ";
    enteredNumbers.forEach(item => {
        // let style = item.classes.length > 0 ? item.classes[0] : 'miss';
        // historyHTML += `<li class="${style}">${item.number} ： ${item.result || 'はずれ'}</li>`;
        historyHTML += `<li class="history">${item.number} ： ${item.result || 'はずれ'}</li>`;
    });
    historyHTML += "</ul>";
    history.innerHTML = historyHTML;

    // 履歴全体の当選数を合計
    let totalWinCount = 0;
    enteredNumbers.forEach(item => {
        if (item.result != 'はずれ') {
            totalWinCount += item.result.split(",").length;
        }
    });

    // 表示
    // document.getElementById("totalCount").textContent = `入力履歴の当選合計：${totalWinCount}`;
    document.getElementById("totalCount").textContent = `当選合計：${totalWinCount}`;
}

function downloadCSV() {
    if (enteredNumbers.length === 0) {
        alert("まだ番号を入力していません");
        return;
    }

    // CSV文字列を作る
    const csvContent = "番号,結果\n" + enteredNumbers.map(item => `${item.number},${item.result}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // 一時的にリンクを作ってクリック
    const a = document.createElement("a");
    a.href = url;
    a.download = "nengajo_result.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // メモリ解放
    URL.revokeObjectURL(url);
}

const images = [
    "images/ougi.png",
    "images/uma1.png",
    "images/uma2.png",
    "images/uma3.png",
    "images/daruma1.png",
    "images/daruma2.png",
    "images/daruma3.png"
];

function createNewYearItem() {
    const container = document.getElementById("newyear-animation");
    const img = document.createElement("img");

    img.src = images[Math.floor(Math.random() * images.length)];
    img.className = "newyear-item";

    // ランダム位置・サイズ・速度
    img.style.left = Math.random() * 100 + "vw";
    img.style.width = 30 + Math.random() * 40 + "px";
    img.style.animationDuration = 6 + Math.random() * 6 + "s";

    container.appendChild(img);

    // 落下後に削除
    setTimeout(() => {
        img.remove();
    }, 12000);
}

// 一定間隔で生成
setInterval(createNewYearItem, 800);
