function drawDashboardVis() {
	
	background('white');
	image(bg,0,0,width,height)




	push();
	translate(0, 100);

	//prerace ranking
	push();
	translate(100, 0);
	//RECORD SECTION

	//fill('black');
	//textSize(H1);
	textFont(myfont);
	//text('PRERACE', 0, 0);

	textSize(H2)
	fill(TEXTFILL);
	text('1. Noelia Fernandez', 0, 40);
	text('1:40', 180, 40);

	fill(TEXTFILL);
	text('2. Noam Ramon Gael', 0, 70);
	text('1:41', 180, 70);
	fill('red')
	text('+ 0:01', 240, 70);

	fill(TEXTFILL);
	text('3. Taddeo Cerletti', 0, 100);
	text('1:48', 180, 100);
	fill('red')
	text('+ 0:08', 240, 100);

	fill(TEXTFILL);
	text('4. David Gerber', 0, 130);
	text('1:55', 180, 130);
	fill('red')
	text('+ 0:15', 240, 130);

	fill(TEXTFILL);
	text('5. Lisa Erard', 0, 160);
	text('2:00', 180, 160);
	fill('red')
	text('+ 0:20', 240, 160);

	fill(TEXTFILL);
	text('6. Elia Gianini', 0, 190);
	text('2:15', 180, 190);
	fill('red')
	text('+ 0:35', 240, 190);

	fill('white');
	textSize(30);
	text(timeresult, 227, 636.5);	


	//race ranking
	push();
	translate(512, 0);
	//RECORD SECTION

	/*fill('black');
	textSize(H1);
	text('RACE', 0, 0);*/

	textSize(H2)
	fill(TEXTFILL);
	text('1. Noelia Fernandez', 0, 40);
	text('1:40', 180, 40);

	fill(TEXTFILL);
	text('2. Noam Ramon Gael', 0, 70);
	text('1:41', 180, 70);
	fill('red')
	text('+ 0:01', 240, 70);

	fill(TEXTFILL);
	text('3. Taddeo Cerletti', 0, 100);
	text('1:48', 180, 100);
	fill('red')
	text('+ 0:08', 240, 100);

	fill(TEXTFILL);
	text('4. David Gerber', 0, 130);
	text('1:55', 180, 130);
	fill('red')
	text('+ 0:15', 240, 130);

	fill(TEXTFILL);
	text('5. Lisa Erard', 0, 160);
	text('2:00', 180, 160);
	fill('red')
	text('+ 0:20', 240, 160);

	fill(TEXTFILL);
	text('6. Elia Gianini', 0, 190);
	text('2:15', 180, 190);
	fill('red')
	text('+ 0:35', 240, 190);

	fill('white');
	textSize(30);
	text('01:40', 215, 636.5);

	noLoop();

}