class Entity {
    x;
    y;
    dx;
    dy;
    radius;
    image;
    color;

    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }

    update(canvas, entities) {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.checkCollision(entities, entities);

        this.x += this.dx;
        this.y += this.dy;
    }

    checkCollision(entities) {
        for (let i = 0; i < entities.length; i++) {
            const targetEntity = entities[i];
            if (targetEntity !== this) {
                const dx = this.x - targetEntity.x;
                const dy = this.y - targetEntity.y;
                const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

                if (distance < this.radius + targetEntity.radius) {
                    let transform = false;
                    if (this instanceof Rock) {
                        if (targetEntity instanceof Paper) {
                            // rock loses to paper
                            transform = true;
                        }
                    } else if (this instanceof Paper) {
                        if (targetEntity instanceof Scissors) {
                            // paper loses to scissors
                            transform = true;
                        }
                    } else if (this instanceof Scissors) {
                        if (targetEntity instanceof Rock) {
                            // scissors loses to rock
                            transform = true;
                        }
                    }

                    if (transform) {
                        this.transformTo(targetEntity, entities);
                    }
                }
            }
        }
    }

    transformTo(targetEntity, entities) {
        const newEntity = new targetEntity.constructor(
            this.x,
            this.y,
            this.dx,
            this.dy,
            this.radius
        );
        entities.splice(entities.indexOf(this), 1, newEntity);
    }
}

class Rock extends Entity {
    constructor(x, y, dx, dy, radius) {
        super(x, y, dx, dy, radius, "blue");
        this.image = new Image();
        this.image.src = "rock.png";
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }

    update(canvas, entities) {
        super.update(canvas, entities);
    }
}

class Paper extends Entity {
    constructor(x, y, dx, dy, radius) {
        super(x, y, dx, dy, radius, "red");
        this.image = new Image();
        this.image.src = "paper.png";
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }

    update(canvas, entities) {
        super.update(canvas, entities);
    }
}

class Scissors extends Entity {
    constructor(x, y, dx, dy, radius) {
        super(x, y, dx, dy, radius, "green");
        this.image = new Image();
        this.image.src = "scissors.png";
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }

    update(canvas, entities) {
        super.update(canvas, entities);
    }
}
