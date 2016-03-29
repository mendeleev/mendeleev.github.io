loadImages();

function loadImages(){
	$.ajax({url: 'files/data.json', dataType: 'json',
		success: function(result, status, xhr){
			
			var $list = $('<ul></ul>').attr('id', 'list').addClass('gallery');
			$('body').append($list);
			
			var $item;
			var $image;
			var $amount;
			for(var i in result){
				$image = $('<img>').attr('id', 'img' + result[i].id)
					.attr('src', 'images/' + result[i].image);
				$amount = $('<span></span>').addClass('counter').text(0);
				$item = $('<li></li>').addClass('item')
					.attr('id', 'item' + result[i].id)
					.append($image, $amount).click(function(){
						count($(this).attr('id'));
					});
					
				if(!localStorage.getItem($($item).attr('id')))
					localStorage.setItem($($item).attr('id'), 0);
				else
					$($item).find('span').text(localStorage.getItem($($item).attr('id')));
				
				$($list).append($item);
			}		
		},
		error: function(xhr,status,error){
			$('body').append($('<h1></h1>').text(xhr.status + ": " + xhr.statusText));
		}
	});
	
}

function count(id){
	var newAmount = (Number)(localStorage.getItem(id)) + 1;
	localStorage.setItem(id, newAmount);
	$('#' + id).find('span').text(newAmount);
}
