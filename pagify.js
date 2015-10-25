var pagingOptions = {
  innerWindow: 2,
  outerWindow: 1,
};

var clipsPerPage = 20;

var listOptions = {
  valueNames: [ 'video', 'date', 'start', 'playfast', 'playslow', 'playsuperslow', 'descrip', 'duration' ],
  page: clipsPerPage,
  plugins: [ ListPagination(pagingOptions) ]
};

var clipList = new List('clips', listOptions);
var paginated = true;
var isolated = false;

$('#unpage').click(function(){
  paginated = !paginated;
  if (paginated) {
    clipList.show(1, clipsPerPage);
    document.getElementById('pagination').style.visibility = 'visible';
    document.getElementById('unpage').text = 'Unpaginate';
  } else {
    clipList.show(1, 100000);
    document.getElementById('pagination').style.visibility = 'hidden';
    document.getElementById('unpage').text = 'Repaginate';
  }
  return false;
});

$('#isolate').click(function(){
  isolated = !isolated;
  if (isolated) {
    $(".viddiv-cont .viddiv .preplayer").html("<br/><br/><br/><br/><br/><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;");
    $(".viddiv-cont .viddiv .postplayer").html("<br/><br/><br/><br/><br/><br/><br/>");
    $(".viddiv-cont").css({"width":"600px"});
    $(".viddiv-cont .viddiv").css({"height":"500px","width":"600px"});
    document.getElementById('isolate').text = 'Collapse';
  } else {
    $(".viddiv-cont .viddiv .preplayer").html("");
    $(".viddiv-cont .viddiv .postplayer").html("");
    $(".viddiv-cont").css({"width":"100%"});
    $(".viddiv-cont .viddiv").css({"height":"250px","width":"100%"});
    document.getElementById('isolate').text = 'Isolate';
  }
  return false;
});
