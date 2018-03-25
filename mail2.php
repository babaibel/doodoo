<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")&&(isset($_POST['adress'])&&$_POST['adress']!="")&&(isset($_POST['product'])&&$_POST['product']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'prasolova20@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Оформлен заказ'; //Заголовок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Товар: <b>'.$_POST['product'].'</b></p>
                        <p><br/></p>
                        <p>Имя: <b>'.$_POST['name'].'</b></p> 
                        <p>Телефон: <b>'.$_POST['phone'].'</b></p> 
                        <p>Адрес: <b>'.$_POST['adress'].'</b></p> 
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Doodoo <prasolova20@gmail.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>