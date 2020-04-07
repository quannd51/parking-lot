# the command line 
init/setup: node bin/setup.js
create slot: npm run create_parking_lot --capacity=6
park a car: npm run park --carNumber=AAA-123
leave a car: npm run leave --carNumber=AAA-123
check status: npm run status

to test: npm test -- --coverage
to setup: node bin/setup.js
to run the file: node bin/parking_lot.js

# note: need to have the file file_inputs.txt, each line is a command