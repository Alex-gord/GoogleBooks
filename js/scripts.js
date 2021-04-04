jQuery(document).ready(function($) {
	$('.search_but').click(function(e){
		e.preventDefault();
		var search_text = $('.search_text').val();
		if (search_text !='') {
			$.ajax({
				url: 'https://www.googleapis.com/books/v1/volumes?q=' + search_text + '&maxResults=20&startIndex=0',
				method: 'get',
				dataType: 'json',
				success: function(data){					
					for (var i=0; i<=data.items.length-1; i++) {
						if (data.items[i].volumeInfo.hasOwnProperty('imageLinks')){
							var img = data.items[i].volumeInfo.imageLinks.smallThumbnail;
						} else {
							img = '../img/no_image.png';
						}
						if (data.items[i].volumeInfo.hasOwnProperty('title')) {
							var title = data.items[i].volumeInfo.title;
							if (title === undefined) {
								title = 'Unknown';
							}
						} else {
							title = 'Unknown';
						}

						if (data.items[i].volumeInfo.hasOwnProperty('authors')) {
							var author = data.items[i].volumeInfo.authors;
							if (author === undefined) {
								author = 'Unknown';
							}
						} else {
							author = 'Unknown';
						}
					
						if (data.items[i].volumeInfo.hasOwnProperty('publishedDate')) {
							var published_date = data.items[i].volumeInfo.publishedDate;
							if(published_date === undefined){
								published_date = 'Unknown';
							}
						} else {
							published_date = 'Unknown';
						}

						if (data.items[i].volumeInfo.hasOwnProperty('infoLink')) {
							var link = data.items[i].volumeInfo.infoLink;
							if(link === undefined){
								link = '#';
							}
						} else {
							link = '#';
						}
						
						$('.books_list').append('<div class="book_item"><div class="img_box"><img class="book_picture" src="'+img+'"></div><div class="book_item_text"><p class="book_title"><span class="book_bold">Title: </span>'+title+'</p><p class="book_author"><span class="book_bold">Author: </span>'+author+'</p><p class="book_published_date"><span class="book_bold">Published date: </span>'+published_date+'</p><a class="book_link" href="'+link+'">More</a></div></div>');

					}
				}
			});
		} else {
			alert('Enter search text');
		}
	});

	$(document).ajaxStart(function(){
		$('.books_list').empty();
		$("#floatingCirclesG").css("display","block");
	});

	$(document).ajaxComplete(function(){
		$("#floatingCirclesG").css("display","none");
	});
});
