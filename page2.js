var db = window.openDatabase('test1', '1.0', 'Test DB', 2 * 1024 * 1024, verif());

function verif() {
    alert("base de donnee cree");
}

function Insert() {
    var id = document.getElementById("pays");
    var name = document.getElementById("email");
    var email = document.getElementById("telephone");


    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS CONTACT (id unique, name, email)');
        tx.executeSql('INSERT INTO CONTACT (id, name, email) VALUES (' + id.value + '," ' + name.value + ' ", " ' + email.value + ' ")');
    });
}

function View() {
    div = document.getElementById("div");
    div.innerHTML = "";
    div.innerHTML = "<table id='table'>";
    var table = document.getElementById("table");
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM CONTACT', [], function(tx, results) {
            console.log(results.rows.item(0).id);
            for (i = 0; i < results.rows.length; i++) {
                r = table.insertRow(i);
                var n1 = table.rows[i].insertCell(0);
                var n2 = table.rows[i].insertCell(1);
                var n3 = table.rows[i].insertCell(2);
                var n4 = table.rows[i].insertCell(3);
                n1.innerHTML = "<p><b>" + results.rows.item(i).id + "</b></p>";
                n2.innerHTML = "<p><b>" + results.rows.item(i).name + "</b></p>";
                n3.innerHTML = "<p><b>" + results.rows.item(i).email + "</b></p>";
                n4.innerHTML = "<button type='button' value='delete' onclick='Drop(" + results.rows.item(i).id + ");'>"
            }
        }, null);
    });
}

function Delete() {
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE CONTACT');
    });
}

function Drop(x) {
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM CONTACT WHERE id=?', [x]);
    });
}