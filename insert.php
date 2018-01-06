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
  $fname="file/".date('Y-m-d',time()).".html" ;//documents
  $f=fopen($fname,"w+b") or exit("不能打开文件");
  fwrite($f,$_POST['CODE']) or exit("不能写入文件");
  $result=$con->query('INSERT OR IGNORE INTO DIA (`PATH`,`NAME`) VALUES ("'.$fname.'","'.date('Y-m-d',time()).'")');
  if($result){echo "done";}else{echo "数据表更改失败";}
  $con->close();
  fclose($f);
  ?>