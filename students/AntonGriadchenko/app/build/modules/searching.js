define(["jquery"],function(){console.log("searching");var e=$(".gallery");$("#search").on("keyup",function(n){var t=new RegExp(n.target.value,"i");e.find("li").hide().filter(function(e,n){return t.test($(n).text())}).show()})});