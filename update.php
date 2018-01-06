<?php
if(!empty($_COOKIE['uid']) and !empty($_COOKIE['pswd'])){
  if($_COOKIE['uid']!="xqqy" or $_COOKIE["pswd"]!="cbslave"){
      header('HTTP/1.0 401 Unauthorized');
      exit();
  }
}else{
header('HTTP/1.0 401 Unauthorized');
exit();
}//login check
$con = new SQLite3("diary.db");//sql
if ($con->connect_error)
  {
  die('Could not connect: ');
  }
if($_POST['CODE']==""){
  $con->query('DELETE FROM `DIA` WHERE PATH ="'.$_COOKIE['DATE'].'"') or exit("不能更改数据库");
  unlink($_COOKIE['DATE']);
  die("deld");
}//delete when empty push
  $fname=$_COOKIE['DATE'];
  $f=fopen($fname,"w+b") or exit("不能打开文件");
  fwrite($f,$_POST['CODE']) or exit("不能写入文件");
  fclose($f);
  echo "done";
  ?>