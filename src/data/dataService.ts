import * as XLSX from 'xlsx';

export interface DMEPOSPersona {
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  specialization: string;
  responsibilities: string;
  tools: string;
  knowledge: string;
  dailyActivities: string;
  kpis: string;
  workflows: string;
  interests: string;
  painPoints: string;
  workarounds: string;
  techComfort: string;
  communication: string;
  personaType: string;
  linkedIn: string;
  dataConfidence: string;
}

class DataService {
  private personas: DMEPOSPersona[] = [];
  private isLoaded = false;

  async loadData(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // Load both Excel files
      const jobPersonas = await this.loadExcelFile('/DMEPOS_Job_Personas (1).xlsx');
      const userPersonas = await this.loadExcelFile('/DMEPOS_User_Personas.xlsx');
      
      // Combine data from both files
      this.personas = [...jobPersonas, ...userPersonas];
      this.isLoaded = true;
      
      console.log(`Loaded ${this.personas.length} DMEPOS personas`);
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  private async loadExcelFile(filename: string): Promise<DMEPOSPersona[]> {
    try {
      const response = await fetch(filename);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      // Skip header row and convert to persona objects
      const personas: DMEPOSPersona[] = data.slice(1).filter(row => row && row.length > 0).map(row => ({
        name: row[0] || '',
        title: row[1] || '',
        company: row[2] || '',
        location: row[3] || '',
        experience: row[4] || '',
        specialization: row[5] || '',
        responsibilities: row[6] || '',
        tools: row[7] || '',
        knowledge: row[8] || '',
        dailyActivities: row[9] || '',
        kpis: row[10] || '',
        workflows: row[11] || '',
        interests: row[12] || '',
        painPoints: row[13] || '',
        workarounds: row[14] || '',
        techComfort: row[15] || '',
        communication: row[16] || '',
        personaType: row[17] || '',
        linkedIn: row[18] || '',
        dataConfidence: row[19] || ''
      }));

      return personas;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return [];
    }
  }

  getPersonas(): DMEPOSPersona[] {
    return this.personas;
  }

  searchPersonas(query: string): DMEPOSPersona[] {
    if (!query.trim()) return this.personas;
    
    const lowercaseQuery = query.toLowerCase();
    return this.personas.filter(persona => 
      Object.values(persona).some(value => 
        value && value.toString().toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  answerQuestion(question: string): string {
    const relevantPersonas = this.searchPersonas(question);
    
    if (relevantPersonas.length === 0) {
      return "I couldn't find any relevant information in the DMEPOS dataset to answer your question. Please try different keywords.";
    }

    // Generate answer based on most relevant personas
    const answer = this.generateAnswer(question, relevantPersonas);
    return answer;
  }

  private generateAnswer(question: string, personas: DMEPOSPersona[]): string {
    const questionLower = question.toLowerCase();
    
    // Check for specific types of questions
    if (questionLower.includes('pain point') || questionLower.includes('challenge') || questionLower.includes('problem')) {
      return this.generatePainPointsAnswer(personas);
    }
    
    if (questionLower.includes('tool') || questionLower.includes('software') || questionLower.includes('technology')) {
      return this.generateToolsAnswer(personas);
    }
    
    if (questionLower.includes('role') || questionLower.includes('job') || questionLower.includes('position')) {
      return this.generateRolesAnswer(personas);
    }
    
    if (questionLower.includes('experience') || questionLower.includes('background')) {
      return this.generateExperienceAnswer(personas);
    }
    
    // Default comprehensive answer
    return this.generateGeneralAnswer(question, personas);
  }

  private generatePainPointsAnswer(personas: DMEPOSPersona[]): string {
    const painPoints = personas.map(p => `${p.name} (${p.title}): ${p.painPoints}`).join('\n\n');
    return `Based on the DMEPOS dataset, here are the key pain points:\n\n${painPoints}`;
  }

  private generateToolsAnswer(personas: DMEPOSPersona[]): string {
    const tools = personas.map(p => `${p.name} (${p.title}): ${p.tools}`).join('\n\n');
    return `Based on the DMEPOS dataset, here are the tools and technologies used:\n\n${tools}`;
  }

  private generateRolesAnswer(personas: DMEPOSPersona[]): string {
    const roles = personas.map(p => `${p.name} - ${p.title} at ${p.company}\nSpecialization: ${p.specialization}\nExperience: ${p.experience}`).join('\n\n');
    return `Based on the DMEPOS dataset, here are the relevant roles:\n\n${roles}`;
  }

  private generateExperienceAnswer(personas: DMEPOSPersona[]): string {
    const experience = personas.map(p => `${p.name} (${p.title}): ${p.experience} - ${p.specialization}`).join('\n\n');
    return `Based on the DMEPOS dataset, here are the experience levels:\n\n${experience}`;
  }

  private generateGeneralAnswer(question: string, personas: DMEPOSPersona[]): string {
    const topPersonas = personas.slice(0, 3); // Limit to top 3 most relevant
    const summary = topPersonas.map(p => 
      `${p.name} - ${p.title} at ${p.company}\n` +
      `Specialization: ${p.specialization}\n` +
      `Key Responsibilities: ${p.responsibilities}\n` +
      `Pain Points: ${p.painPoints}`
    ).join('\n\n');

    return `Based on the DMEPOS dataset, here's what I found regarding "${question}":\n\n${summary}`;
  }
}

export const dataService = new DataService();
