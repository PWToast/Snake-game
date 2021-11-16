let canvas, ctx; 
let score = 0;

        window.onload = function() {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext("2d");

            document.addEventListener("keydown", keyDownEvent); 

            // ความเร็วของเกม
            let x = 10;
            setInterval(draw, 1000 / x);
        };

        // ขนาดของโลกเกม 
        let gridSize = tileSize = 29; // 29 x 29 = 841
        let nextX = nextY = 0;

        // score

        // งู 
        let defaultTailSize = 1; //ขนาดหางของงูเริ่มต้น = 1
        let tailSize = defaultTailSize; //ขนาดหางของงู = defaultTailSize
        let snakeTrail = [];
        let snakeX = snakeY = Math.floor(Math.random() * gridSize); //จุดเริ่มต้นของงู (สุ่มเกิดภายใน canvas)

        // แอปเปิ้ล 
        let appleX = appleY = Math.floor(Math.random() * gridSize);

        // draw 
        function draw() {
            // บังคับงูไปยังตำแหน่งต่อไป
            snakeX += nextX;
            snakeY += nextY; 

            // งูเดินทะลุโลก
            if (snakeX < 0) {
            snakeX = gridSize - 1;
            }
            if (snakeX > gridSize - 1) {
            snakeX = 0;
            }

            if (snakeY < 0) {
            snakeY = gridSize - 1;
            }
            
            if (snakeY > gridSize - 1) {
            snakeY = 0;
        }

        // งูกินแอปเปิ้ล
        if (snakeX == appleX && snakeY == appleY) {
            tailSize++;
            score += 10;
            document.getElementById('score').innerHTML = score;
        // สุ่มจุดเกิดของแอปเปิ้ล
            appleX = Math.floor(Math.random() * gridSize);
            appleY = Math.floor(Math.random() * gridSize);
        }

        // สี Background 
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // สีของงู
        ctx.fillStyle = "green";
        // ถ้างูกินแอปเปิ้ล
        for (let i = 0; i < snakeTrail.length; i++) {
            ctx.fillRect(
                snakeTrail[i].x * tileSize,
                snakeTrail[i].y * tileSize,
                tileSize,
                tileSize
            );

            // ถ้างูกินหางตัวเอง
            if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
                tailSize = defaultTailSize;
            // ถ้ากินหางตัวเองสกอร์จะเหลือ 0 
                score = 0;
                document.getElementById('score').innerHTML = score;
            } 
        }   

        // สีแอปเปิ้ล
        ctx.fillStyle = "yellow";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

        // ตั้งค่าหางงู
        snakeTrail.push({ x: snakeX, y: snakeY });
            while (snakeTrail.length > tailSize) {
                snakeTrail.shift();
                console.log(snakeTrail)
            }
        }
        // input
        function keyDownEvent(e) {
            switch (e.keyCode) {
                case 37:
                    nextX = -1;
                    nextY = 0;
                    break;
                case 38:
                    nextX = 0;
                    nextY = -1;
                    break;
                case 39:
                    nextX = 1;
                    nextY = 0;
                    break;
                case 40:
                    nextX = 0;
                    nextY = 1;
                    break;
            }
        }