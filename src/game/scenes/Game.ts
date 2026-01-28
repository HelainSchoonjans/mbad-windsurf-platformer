import { Scene } from 'phaser';
import { ECSManager } from '../ecs/ecs-manager';
import { MovementSystem } from '../ecs/systems/movement-system';
import { RenderSystem } from '../ecs/systems/render-system';
import { EntityFactory } from '../ecs/entities/entity-factory';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    
    private ecsManager: ECSManager;
    private movementSystem: MovementSystem;
    private renderSystem: RenderSystem;
    private graphics: Phaser.GameObjects.Graphics;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        // Initialize ECS framework
        this.initializeECS();

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }

    /**
     * Initialize the ECS framework and create test entities
     */
    private initializeECS(): void {
        // Create ECS manager
        this.ecsManager = new ECSManager();

        // Create and register systems
        this.movementSystem = new MovementSystem();
        this.renderSystem = new RenderSystem();
        
        this.ecsManager.registerSystem(this.movementSystem);
        this.ecsManager.registerSystem(this.renderSystem);

        // Create graphics context for rendering
        this.graphics = this.add.graphics();
        this.renderSystem.setGraphicsContext(this.graphics);

        // Create test entities to demonstrate ECS functionality
        this.createTestEntities();
    }

    /**
     * Create test entities to demonstrate ECS framework
     */
    private createTestEntities(): void {
        // Create a player entity
        const player = EntityFactory.createPlayer(100, 300, 32, 32, '#0066ff');
        this.ecsManager.addEntity(player);

        // Create some platforms
        const platform1 = EntityFactory.createPlatform(200, 400, 200, 20, '#666666');
        const platform2 = EntityFactory.createPlatform(500, 350, 150, 20, '#666666');
        const platform3 = EntityFactory.createPlatform(800, 300, 200, 20, '#666666');
        
        this.ecsManager.addEntity(platform1);
        this.ecsManager.addEntity(platform2);
        this.ecsManager.addEntity(platform3);

        // Create a castle endpoint
        const castle = EntityFactory.createCastle(900, 250, 64, 64, '#ffd700');
        this.ecsManager.addEntity(castle);

        // Add entities to systems
        this.movementSystem.addEntity(player);
        this.renderSystem.addEntity(player);
        this.renderSystem.addEntity(platform1);
        this.renderSystem.addEntity(platform2);
        this.renderSystem.addEntity(platform3);
        this.renderSystem.addEntity(castle);

        console.log('ECS initialized with entities:', this.ecsManager.getStats());
    }

    /**
     * Update method called each frame
     */
    update(time: number, delta: number): void {
        // time parameter available for future use (e.g., timing-based events)
        // Convert delta from milliseconds to seconds for ECS systems
        const deltaTime = delta / 1000;
        
        // Update ECS systems
        this.ecsManager.update(deltaTime);
    }
}
