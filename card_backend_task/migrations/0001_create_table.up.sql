CREATE TABLE cards (
                          id VARCHAR(100) PRIMARY KEY,
                          title VARCHAR(100) NOT NULL UNIQUE,
                          price float4 NOT NULL,
                          imageUrl VARCHAR(100) NOT NULL,
                          isSelected bool NOT NULL,
                          isFavorite bool NOT NULL,
                          quantity VARCHAR(100) NOT NULL
);
