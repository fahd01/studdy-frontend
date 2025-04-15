import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(rendererFactory: RendererFactory2) {    
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private genAI = new GoogleGenerativeAI('AIzaSyDy8ck9bmDHeY71p-Lg8TFYU5X2GM1wG18');
  private model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  private textCache = new Map<string, string>();
  private renderer: Renderer2;

  

  async translateApp(lang: string): Promise<void> {
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'a', 'button', 'label',
      'th', 'td', 'li', 'div[title]',
      '.card-title', '.btn-text', '.menu-item','table-container','reclamation-container'
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        await this.translateElement(element, lang);
      }
    }
  }

  private async translateElement(element: Element, lang: string): Promise<void> {
    const originalText = element.textContent?.trim();
    
    if (originalText && !element.getAttribute('_translated')) {
      try {
        const translated = await this.getTranslation(originalText, lang);
        this.renderer.setProperty(element, 'textContent', translated);
        this.renderer.setAttribute(element, '_translated', 'true');
      } catch (error) {
        console.error(`Error translating "${originalText}":`, error);
      }
    }
  }

  private async getTranslation(text: string, lang: string): Promise<string> {
    const cacheKey = `${text}|${lang}`;
    
    if (this.textCache.has(cacheKey)) {
      return this.textCache.get(cacheKey)!;
    }

    const prompt = `Traduis ce texte en ${lang} (réponse brute sans commentaires):
"${text}"`;
    
    const result = await this.model.generateContent(prompt);
    const translated = (await result.response.text()).trim();
    
    this.textCache.set(cacheKey, translated);
    return translated;
  }
}
