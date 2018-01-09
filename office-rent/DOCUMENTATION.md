Office Rent website - documentation

Non-authorized users
	1. Register
	2. Login
	3. Home Page - if the user tries to go to either 4. Rent an office or 5. Publish an offer he will be redirected to the login page
	
Authorized users
	3. Home page - option to redirect to 4. Rent an office to rent or 5. Publish an offer
	4. Rent an office - list all the rental offers with an option to search by category
	5. Publish an offer - create form with title, image, address, description, price, area, category(option from a list) and phone
	6. Edit an offer - editing a offer by id with the same fields as 5. Publish an offer
	7. Detail view of each offer - +comment section. If the user is author or admin he has the ability to edit or delete the offer. 
									Deleting the offer will also delete all the comments for this offer from the database
									The user can go to the profile of the publisher of the current offer and see all their offers
	8. Profile - the user can edit his email which he used to register and also add personal info if the profile is his
				 all the offers of the currently viewed user are shown
	9. My Offers - a page where the currently logged user can see all his published offers
	
Admin
	10. Admin panel - the admin can create or delete categories
	11. The admin can edit and/or delete offers of other users
