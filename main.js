setTimeout(() => {
    document.getElementById("warn").innerHTML="";
}, 4001);
    function choose() {//write or edit
        if(getcookie("DATE")==getcookie("NOW")){
            edit(getcookie("PATH"));
            return;
        }
        document.getElementById("myModalLabel").innerHTML="书写日记"
        document.getElementById("button").innerHTML=
        '<button type="button" class="btn btn-default" data-dismiss="modal" id="hi">关闭</button>'+
        '<button type="button" class="btn btn-primary" id="up" onclick="insert()">提交更改</button>';
        show();
    }

    function show() {//show summernote
        var height=window.innerHeight;
        $('#myModal').on('hidden.bs.modal', hide);
        $('#myModal').modal('show');
        $('#summernote').summernote({
            lang: 'zh-CN', // default: 'en-US'
            height: height*0.55,
            focus: true,
            toolbar: [
                ['style', ['bold', 'strikethrough', 'underline', 'clear']],
                ['font', ['fontsize', 'color', 'strikethrough', 'clear']],
                ['paragraph', ['paragraph', 'ol', 'ul','hr']],
                ['msic', ['codeview']]
            ],
            placeholder: '喵'
        })
    }

    function hide() {//reflash summernote
        $('#summernote').summernote('destroy');
        document.getElementById("code").innerHTML="<div id='summernote'></div>"
    }
    function insert(){//upload for insert
        var code=$('#summernote').summernote('code');
        var form=new FormData();
        var xhr=new XMLHttpRequest();
        form.append("CODE",code);
        xhr.open("post","insert.php",true);
        xhr.send(form);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 ){
                if(xhr.status==200){
                    if(xhr.responseText=='done'){
                        document.location="/diary/index.php?success=设置成功"
                    } else{
                        document.location="/diary/index.php?error="+xhr.responseText;
                    }
                } else{
                    document.location="/diary/index.php?error="+"网络错误"+xhr.status
                }
            }
        }
    }
    function edit(data){//open edit
        setcookie("DATE",data,1);
        var xhr=new XMLHttpRequest;
        xhr.open("get",data+"?"+new Date(),true);
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 ){
                if(xhr.status==200){
                    document.getElementById("summernote").innerHTML=xhr.responseText;
                    document.getElementById("myModalLabel").innerHTML="修改日记";
                    show();
                    document.getElementById("button").innerHTML=
                        '<button type="button" class="btn btn-default" data-dismiss="modal" id="hi">关闭</button>'+
                        '<button type="button" class="btn btn-primary" id="up" onclick="update()">提交更改</button>';
                } else{
                    document.location="/diary/index.php?error="+"网络错误"+xhr.status
                }
            }
        }
    }
    function update(){//upload for edit
        var code=$('#summernote').summernote('code');
        var form=new FormData();
        var xhr=new XMLHttpRequest();
        form.append("CODE",code);
        xhr.open("post","update.php",true);
        xhr.send(form);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 ){
                if(xhr.status==200){
                    switch (xhr.responseText){
                        case "done":
                        document.location="/diary/index.php?success=设置成功";
                        break;
                        case "deld":
                        document.location="/diary/index.php?warning=删除成功";
                        break;
                        default:
                        document.location="/diary/index.php?error="+xhr.responseText;
                    };
                } else{
                    document.location="/diary/index.php?error="+"网络错误"+xhr.status
                }
            }
        }
    }
    function look(data){//open look window
        var xhr=new XMLHttpRequest;
        xhr.open("get",data+"?"+new Date(),true);
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 ){
                if(xhr.status==200){
                    document.getElementById("myModalLabel").innerHTML=data;
                    document.getElementById("code").innerHTML=xhr.responseText;
                    document.getElementById("button").innerHTML=
                        '<button type="button" class="btn btn-default" data-dismiss="modal" id="hi">关闭</button>';
                        $('#myModal').on('hidden.bs.modal', hide);
                        $('#myModal').modal('show');
                } else{
                    document.location="/diary/index.php?error="+"网络错误"+xhr.status
                }
            }
        }
    }