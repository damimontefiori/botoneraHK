#!/usr/bin/env python3
"""
Genera iconos PWA para la aplicación Hollow Knight Soundboard
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    """Crea un icono con el símbolo de Hollow Knight"""
    
    # Crear imagen con fondo transparente
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colores tema Hollow Knight
    bg_color = (45, 45, 55, 255)  # Gris oscuro
    accent_color = (255, 140, 0, 255)  # Naranja
    text_color = (255, 255, 255, 255)  # Blanco
    
    # Fondo circular
    margin = size * 0.05
    draw.ellipse([margin, margin, size - margin, size - margin], 
                 fill=bg_color, outline=accent_color, width=int(size * 0.02))
    
    # Símbolo central - una versión simplificada del símbolo de Hollow Knight
    center = size // 2
    
    # Círculo central (cabeza)
    head_radius = size * 0.15
    draw.ellipse([center - head_radius, center - head_radius * 1.2, 
                  center + head_radius, center + head_radius * 0.8], 
                 fill=text_color)
    
    # Ojos (huecos negros)
    eye_size = size * 0.04
    eye_offset_x = size * 0.08
    eye_offset_y = size * 0.08
    
    # Ojo izquierdo
    draw.ellipse([center - eye_offset_x - eye_size, center - eye_offset_y - eye_size,
                  center - eye_offset_x + eye_size, center - eye_offset_y + eye_size],
                 fill=bg_color)
    
    # Ojo derecho  
    draw.ellipse([center + eye_offset_x - eye_size, center - eye_offset_y - eye_size,
                  center + eye_offset_x + eye_size, center - eye_offset_y + eye_size],
                 fill=bg_color)
    
    # Cuernos simples
    horn_width = size * 0.03
    horn_height = size * 0.15
    
    # Cuerno izquierdo
    draw.polygon([
        (center - size * 0.12, center - head_radius * 1.2),
        (center - size * 0.18, center - head_radius * 1.2 - horn_height),
        (center - size * 0.08, center - head_radius * 1.2 - horn_height * 0.7)
    ], fill=text_color)
    
    # Cuerno derecho
    draw.polygon([
        (center + size * 0.12, center - head_radius * 1.2),
        (center + size * 0.18, center - head_radius * 1.2 - horn_height),
        (center + size * 0.08, center - head_radius * 1.2 - horn_height * 0.7)
    ], fill=text_color)
    
    # Cuerpo simple
    body_width = size * 0.08
    body_height = size * 0.2
    draw.ellipse([center - body_width, center + head_radius * 0.8,
                  center + body_width, center + head_radius * 0.8 + body_height],
                 fill=text_color)
    
    # Guardar imagen
    img.save(output_path, 'PNG')
    print(f"✅ Icono creado: {output_path} ({size}x{size})")

def main():
    # Crear directorio de assets si no existe
    os.makedirs('assets', exist_ok=True)
    
    # Tamaños de iconos PWA estándar
    icon_sizes = [
        (72, 'icon-72x72.png'),
        (96, 'icon-96x96.png'),
        (128, 'icon-128x128.png'),
        (144, 'icon-144x144.png'),
        (152, 'icon-152x152.png'),
        (192, 'icon-192x192.png'),
        (384, 'icon-384x384.png'),
        (512, 'icon-512x512.png')
    ]
    
    print("🎨 Generando iconos PWA para Hollow Knight Soundboard...")
    
    for size, filename in icon_sizes:
        output_path = os.path.join('assets', filename)
        create_icon(size, output_path)
    
    # Crear favicon.ico (16x16 y 32x32)
    favicon_sizes = [16, 32]
    favicon_images = []
    
    for size in favicon_sizes:
        temp_path = f'assets/temp_{size}.png'
        create_icon(size, temp_path)
        favicon_images.append(Image.open(temp_path))
    
    # Guardar como favicon.ico
    favicon_images[0].save('assets/favicon.ico', 
                          format='ICO', 
                          sizes=[(16, 16), (32, 32)],
                          append_images=favicon_images[1:])
    
    # Limpiar archivos temporales
    for size in favicon_sizes:
        temp_path = f'assets/temp_{size}.png'
        if os.path.exists(temp_path):
            os.remove(temp_path)
    
    print("✅ Favicon.ico creado")
    
    # Crear apple-touch-icon
    create_icon(180, 'assets/apple-touch-icon.png')
    
    print("\n🎯 ICONOS GENERADOS:")
    print("   📱 PWA Icons: 8 tamaños (72px - 512px)")
    print("   🌐 Favicon: 16px y 32px")
    print("   🍎 Apple Touch Icon: 180px")
    print("\n📋 Los iconos están listos para deployment!")

if __name__ == "__main__":
    main()